import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { User, UserRole } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userId = (user as any)._id?.toString() || String((user as any)._id);
    await this.usersService.updateLastLogin(userId);

    const payload = {
      email: user.email,
      sub: userId,
      role: user.role,
    };

    // Generate access token (short-lived)
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION') || '15m',
    });

    // Generate refresh token (long-lived)
    const refresh_token = this.jwtService.sign(
      { sub: userId },
      {
        secret:
          this.configService.get('JWT_REFRESH_SECRET') ||
          this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION') || '7d',
      },
    );

    return {
      access_token,
      refresh_token,
      user: {
        id: userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret:
          this.configService.get('JWT_REFRESH_SECRET') ||
          this.configService.get('JWT_SECRET'),
      });

      const user = await this.usersService.findById(payload.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newPayload = {
        email: user.email,
        sub: (user as any)._id?.toString() || String((user as any)._id),
        role: user.role,
      };

      const access_token = this.jwtService.sign(newPayload, {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRATION') || '15m',
      });

      return { access_token };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(userId: string) {
    return this.usersService.findById(userId);
  }

  // Update the authenticated user's profile
  async updateProfile(userId: string, data: Partial<User>) {
    // Only allow fields that exist on the schema
    const allowed = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'city',
    ];
    const update: any = {};
    for (const key of allowed) {
      if (data[key as keyof User] !== undefined) {
        update[key] = data[key as keyof User];
      }
    }
    // If a combined username is sent, split it
    if ((data as any).username) {
      const parts = (data as any).username.split(' ');
      update.firstName = parts[0];
      update.lastName = parts.slice(1).join(' ');
    }
    const updated = await this.usersService.update(userId, update);
    return updated;
  }

  async register(createUserDto: any) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }

    // Map userType to valid role (customer -> user)
    let role: UserRole = UserRole.USER; // default to 'user'
    if (createUserDto.userType === 'admin') {
      role = UserRole.ADMIN;
    } else if (createUserDto.userType === 'moderator') {
      role = UserRole.MODERATOR;
    }

    // Create the new user
    const newUser = await this.usersService.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      password: createUserDto.password,
      role: role,
    });

    // Automatically log in the new user
    const userId =
      (newUser as any)._id?.toString() || String((newUser as any)._id);

    const payload = {
      email: newUser.email,
      sub: userId,
      role: newUser.role,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION') || '15m',
    });

    const refresh_token = this.jwtService.sign(
      { sub: userId },
      {
        secret:
          this.configService.get('JWT_REFRESH_SECRET') ||
          this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION') || '7d',
      },
    );

    return {
      access_token,
      refresh_token,
      user: {
        id: userId,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
      },
    };
  }
}

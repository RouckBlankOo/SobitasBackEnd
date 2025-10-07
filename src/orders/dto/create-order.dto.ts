import { IsNotEmpty, IsEmail, IsArray, IsNumber, IsOptional, IsString, IsEnum, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../schemas/order.schema';

class OrderItemDto {
  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  image?: string;
}

class AddressDto {
  @IsNotEmpty()
  @IsString()
  governorate: string;

  @IsNotEmpty()
  @IsString()
  delegation: string;

  @IsNotEmpty()
  @IsString()
  locality: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsString()
  street?: string;
}

class ShippingInfoDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;

  @IsNotEmpty()
  @IsString()
  customerPhone: string;

  @ValidateNested()
  @Type(() => ShippingInfoDto)
  shippingInfo: ShippingInfoDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  shippingCost?: number = 0;

  @IsOptional()
  @IsNumber()
  @Min(0)
  taxAmount?: number = 0;

  @IsOptional()
  @IsString()
  currency?: string = 'TND';

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus = OrderStatus.PENDING;

  @IsOptional()
  @IsString()
  notes?: string;
}
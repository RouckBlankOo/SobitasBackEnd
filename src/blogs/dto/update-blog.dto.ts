import { PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { IsObject, IsOptional } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsObject()
  @IsOptional()
  image?: {
    url: string;
    alt?: string;
  };
}

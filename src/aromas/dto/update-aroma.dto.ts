import { PartialType } from '@nestjs/mapped-types';
import { CreateAromaDto } from './create-aroma.dto';

export class UpdateAromaDto extends PartialType(CreateAromaDto) {}


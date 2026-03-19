import { PartialType } from '@nestjs/swagger';
import { CreateCoordinatesDto } from './create-coordinates.dto';

export class UpdateCoordinatesDto extends PartialType(CreateCoordinatesDto) {}

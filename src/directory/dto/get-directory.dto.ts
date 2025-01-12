import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetDirectoryDto {
  @IsOptional()
  @Transform(({ value }) => value ?? '/')
  destination?: string = '/';
}

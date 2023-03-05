import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { IsDelete } from 'src/common/interface/common.interface';
import { CreateDevlogDto } from './create-devlog.dto';

export class UpdateDevlogDto extends PartialType(CreateDevlogDto) {
  @IsOptional()
  @IsEnum(IsDelete)
  readonly isDeleted: IsDelete;
}

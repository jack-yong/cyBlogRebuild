import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { IsDelete, IsRead } from 'src/common/interface/common.interface';
import { CreateLmrDto } from './create-lmr.dto';

export class UpdateLmrDto extends PartialType(CreateLmrDto) {
  @IsOptional()
  @IsEnum(IsDelete)
  readonly isDeleted: IsDelete;

  @IsOptional()
  @IsEnum(IsRead)
  readonly isRead: IsRead;
}

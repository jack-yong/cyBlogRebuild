import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { IsDelete } from 'src/common/interface/common.interface';
import { CreateLinkDto } from './create-link.dto';

export class UpdateLinkDto extends PartialType(CreateLinkDto) {
  @IsOptional()
  @IsEnum(IsDelete)
  readonly isDeleted: IsDelete;

  @IsOptional()
  @IsInt()
  readonly linkRank: number;
}

import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { IsDelete } from 'src/common/interface/common.interface';
import { CreateDspeechDto } from './create-dspeech.dto';

export class UpdateDspeechDto extends PartialType(CreateDspeechDto) {
  @IsOptional()
  @IsEnum(IsDelete)
  readonly isDeleted: IsDelete;
}

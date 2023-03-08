import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsEnum } from 'class-validator';
import { IsDelete, IsPass } from 'src/common/interface/common.interface';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsOptional()
  @IsEnum(IsDelete)
  readonly isDeleted: IsDelete;

  @IsOptional()
  @IsEnum(IsPass)
  readonly isPass: IsPass;
}

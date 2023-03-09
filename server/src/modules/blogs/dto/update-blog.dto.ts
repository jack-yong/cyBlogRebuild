import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsEnum, IsInt, IsOptional } from 'class-validator';
import { EnableComment, IsDelete } from 'src/common/interface/common.interface';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsOptional()
  @IsEnum(EnableComment)
  readonly blogEnableComment: EnableComment;

  @IsOptional()
  @IsEnum(IsDelete)
  readonly isDeleted: IsDelete;

  @IsOptional()
  @IsDate()
  readonly blogUpdateTime: Date;

  @IsOptional()
  @IsInt()
  readonly blogViews: number;

  @IsOptional()
  @IsInt()
  readonly blogLikes: number;
}

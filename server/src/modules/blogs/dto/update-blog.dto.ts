import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsEnum, IsInt, IsOptional, IsUrl } from 'class-validator';
import { IsDelete } from 'src/common/interface/common.interface';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsOptional()
  @IsDate()
  readonly blogUpdateTime: Date;

  @IsOptional()
  @IsInt()
  readonly blogViews: number;

  @IsOptional()
  @IsInt()
  readonly blogLikes: number;

  @IsOptional()
  @IsUrl()
  readonly blogSubUrl: string;

  @IsOptional()
  @IsEnum(IsDelete)
  readonly isDeleted: IsDelete;
}

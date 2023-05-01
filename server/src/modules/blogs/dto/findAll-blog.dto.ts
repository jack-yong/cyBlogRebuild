import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  BlogStatus,
  EnableComment,
} from 'src/common/interface/common.interface';

export class findAllBlogDto {
  @IsString()
  @IsOptional()
  readonly blogTitle: string;

  @IsUUID()
  @IsOptional()
  readonly blogCategoryId: string;

  @IsEnum(BlogStatus)
  @IsOptional()
  readonly blogStatus: BlogStatus;

  @IsEnum(EnableComment)
  @IsOptional()
  readonly blogEnableComment: EnableComment;

  @IsString()
  @IsOptional()
  readonly blogTags: string;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly pageSize: number;
}

import { IsEnum, IsOptional, IsString, IsUrl, IsUUID } from 'class-validator';
import {
  BlogStatus,
  EnableComment,
} from 'src/common/interface/common.interface';

export class CreateBlogDto {
  @IsString()
  readonly blogTitle: string;

  @IsUrl()
  @IsOptional()
  readonly blogCoverImage: string;

  @IsString()
  readonly blogContent: string;

  @IsUUID()
  readonly blogCategoryId: string;

  @IsEnum(BlogStatus)
  readonly blogStatus: BlogStatus;

  @IsEnum(EnableComment)
  readonly blogEnableComment: EnableComment;

  @IsString()
  @IsOptional()
  readonly blogTags: string;
}

import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  commentBlogId: string;

  @IsUUID()
  commentAnswererid: string;

  @IsString()
  commentFatherid: string;

  @IsString()
  commentBody: string;
}

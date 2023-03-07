import { IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  readonly tagName: string;

  @IsString()
  readonly tagColor: string;
}

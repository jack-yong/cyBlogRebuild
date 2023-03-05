import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  readonly categoryName: string;

  @IsString()
  readonly categoryIcon: string;
}

//使用@nestjs/swagger出现了问题
import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { IsDelete } from 'src/common/dto/type';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsOptional()
  @IsEnum(IsDelete)
  readonly isDeleted: IsDelete;

  @IsOptional()
  @IsInt()
  readonly categoryRank: number;
}

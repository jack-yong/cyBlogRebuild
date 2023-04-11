import {
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from 'src/common/interface/common.interface';
export class FindAllCategoryDto {
  @IsString()
  @IsOptional()
  readonly categoryName: string;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly pageSize: number;
}

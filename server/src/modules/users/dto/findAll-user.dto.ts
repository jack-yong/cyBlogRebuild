import {
  IsString,
  IsNumber,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from 'src/common/interface/common.interface';
export class FindAllUserDto {
  @IsString()
  @IsOptional()
  readonly nickname: string;

  @IsEmail()
  @IsOptional()
  readonly email: string;

  @IsEnum(UserRole)
  @IsOptional()
  readonly role: UserRole;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly pageSize: number;
}

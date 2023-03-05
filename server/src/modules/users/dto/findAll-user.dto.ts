import { IsString, IsNumber } from 'class-validator';
export class FindAllUserDto {
  @IsString()
  readonly keyWord: string;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly pageSize: number;
}

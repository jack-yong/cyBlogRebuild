import { IsString, IsNumber, IsOptional } from 'class-validator';
export class FindAllTagDto {
  @IsString()
  @IsOptional()
  readonly tagName: string;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly pageSize: number;
}

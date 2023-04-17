import { IsString, IsNumber, IsOptional } from 'class-validator';
export class FindAllPortfolioDto {
  @IsString()
  @IsOptional()
  readonly portfolioTitle: string;

  @IsString()
  @IsOptional()
  readonly portfolioDescribe: string;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly pageSize: number;
}

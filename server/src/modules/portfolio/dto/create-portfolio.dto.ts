import { IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsString()
  readonly portfolioTitle: string;

  @IsString()
  readonly portfolioDescribe: string;

  @IsString()
  readonly portfolioImgurl: string;

  @IsString()
  readonly portfolioUrl: string;
}

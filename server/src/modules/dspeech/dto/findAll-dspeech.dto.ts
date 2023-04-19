import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class FindAllDspeechDto {
  @IsString()
  @IsOptional()
  readonly dspeechContent: string;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly pageSize: number;
}

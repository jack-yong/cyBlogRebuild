import { IsString, IsNumber, IsOptional } from 'class-validator';
import { devLogType } from 'src/common/interface/common.interface';
export class FindAllDevlogDto {
  @IsString()
  @IsOptional()
  readonly dlTitle: string;

  @IsString()
  @IsOptional()
  readonly dlType: devLogType;

  @IsString()
  @IsOptional()
  readonly dlContent: string;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly pageSize: number;
}

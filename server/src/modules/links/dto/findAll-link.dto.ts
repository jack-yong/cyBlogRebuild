import { IsString, IsNumber, IsOptional } from 'class-validator';
import { linkType } from 'src/common/interface/common.interface';
export class FindAllLinkDto {
  @IsString()
  @IsOptional()
  readonly linkName: string;

  @IsString()
  @IsOptional()
  readonly linkDescription: string;

  @IsString()
  @IsOptional()
  readonly linkType: linkType;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly pageSize: number;
}

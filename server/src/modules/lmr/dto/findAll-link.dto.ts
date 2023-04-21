import { IsString, IsNumber, IsOptional } from 'class-validator';
import { IsRead } from 'src/common/interface/common.interface';
export class FindAllMessageDto {
  @IsString()
  @IsOptional()
  readonly lmrContent: string;

  @IsString()
  @IsOptional()
  readonly isRead: IsRead;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly pageSize: number;
}

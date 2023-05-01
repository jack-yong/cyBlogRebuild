import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { IsRead } from 'src/common/interface/common.interface';
export class FindAllMessageDto {
  @IsString()
  @IsOptional()
  readonly lmrContent: string;

  @IsEnum(IsRead)
  @IsOptional()
  readonly isRead: IsRead;

  @IsNumber()
  readonly page: number;

  @IsNumber()
  readonly pageSize: number;
}

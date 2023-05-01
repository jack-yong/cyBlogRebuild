import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsRead } from 'src/common/interface/common.interface';

export class CreateLmrDto {
  @IsUUID()
  readonly lmrAnswererId: string;

  @IsString()
  @IsOptional()
  readonly lmrFatherid: string;

  @IsString()
  readonly lmrContent: string;

  @IsEnum(IsRead)
  @IsOptional()
  readonly isRead: IsRead;
}

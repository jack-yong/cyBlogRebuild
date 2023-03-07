import { IsString, IsUUID } from 'class-validator';

export class CreateLmrDto {
  @IsUUID()
  readonly lmrAnswererId: string;

  @IsString()
  readonly lmrFatherid: string;

  @IsString()
  readonly lmrContent: string;
}

import { IsEnum, IsString } from 'class-validator';
import { devLogType } from 'src/common/interface/common.interface';

export class CreateDevlogDto {
  @IsString()
  readonly dlTitle: string;

  @IsEnum(devLogType)
  readonly dlType: devLogType;

  @IsString()
  readonly dlContent: string;
}

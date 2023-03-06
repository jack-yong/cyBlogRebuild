import { IsString, IsUrl } from 'class-validator';

export class CreateDspeechDto {
  @IsString()
  dspeechContent: string;

  @IsUrl()
  dspeechPicsUrl: string;
}

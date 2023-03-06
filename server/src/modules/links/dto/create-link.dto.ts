import { IsEnum, IsString, IsUrl } from 'class-validator';
import { linkType } from 'src/common/interface/common.interface';

export class CreateLinkDto {
  @IsString()
  readonly linkName: string;

  @IsString()
  readonly linkDescription: string;

  @IsUrl()
  readonly linkUrl: string;

  @IsUrl()
  readonly linkAvater: string;

  @IsEnum(linkType)
  readonly linkType: linkType;
}

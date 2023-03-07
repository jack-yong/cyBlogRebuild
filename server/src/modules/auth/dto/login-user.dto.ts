import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  //用户名
  @IsEmail()
  readonly email: string;

  //用户密码
  @IsString()
  readonly password: string;
}

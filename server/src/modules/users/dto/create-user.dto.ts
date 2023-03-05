import { IsString, IsEnum } from 'class-validator';
import { UserRole } from 'src/common/dto/type';
export class CreateUserDto {
  //IsString验证器帮助我们验证dto的字段是否是我们需要的类型
  //使用readonly关键字可以帮助我们保持不变性，用户姓名
  //如果不满足验证条件，程序会自动抛出400异常。

  //用户名
  @IsString()
  readonly nickname: string;

  //用户密码
  @IsString()
  readonly password: string;

  //用户邮箱
  @IsString()
  readonly email: string;

  //用户头像地址
  @IsString()
  readonly avatar: string;

  //用户昵称
  // @IsString()
  // readonly nickname: string;

  //用户角色
  @IsEnum(UserRole)
  readonly role: UserRole;

  //用户是否被删除
  // @IsEnum(IsDelete)
  // readonly isDelete: IsDelete;

  // @IsDate()
  // readonly recentlyLanched: Date;
}

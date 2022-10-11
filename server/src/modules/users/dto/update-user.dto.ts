import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/swagger';
import { IsString, IsDate, IsBoolean } from 'class-validator';
//使用readonly关键字可以帮助我们保持不变性,与create-user.dto的区别是，我们希望这里面的属性都是可选的
//使用PartialType注解可以帮助我们减少冗余代码，同时这个函数所做的事情是返回我们传递给它的类型，同时将该属性设置为可选的
export class UpdateUserDto extends PartialType(CreateUserDto) {
  //用户最近登录时间
  @IsDate()
  readonly recentlyLanched: Date;
  //用户是否被删除
  @IsBoolean()
  readonly isDelete: boolean;
}

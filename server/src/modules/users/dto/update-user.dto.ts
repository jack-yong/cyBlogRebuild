//使用@nestjs/swagger出现了问题
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsOptional, IsEnum } from 'class-validator';
import { IsDelete } from 'src/common/interface/common.interface';
//使用readonly关键字可以帮助我们保持不变性,与create-user.dto的区别是，我们希望这里面的属性都是可选的
//使用PartialType注解可以帮助我们减少冗余代码，同时这个函数所做的事情是返回我们传递给它的类型，同时将该属性设置为可选的
export class UpdateUserDto extends PartialType(CreateUserDto) {
  //用户是否被删除
  @IsOptional()
  @IsEnum(IsDelete)
  readonly isDelete: IsDelete;

  //用户是否被删除
  @IsOptional()
  readonly userphone: string;

  @IsOptional()
  @IsDate()
  readonly recentlyLanched: Date;
}

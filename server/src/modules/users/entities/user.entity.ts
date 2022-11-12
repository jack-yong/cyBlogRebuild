import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
//用户的实体类文件，定义用户内部的属性类型
import { Document } from 'mongoose';

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export enum IsDelete {
  Death = '0',
  Alive = '1',
}
@Schema()
export class User extends Document {
  //mongoose默认为用户添加了用户id
  // @Prop()
  // _id: string;

  //用户名
  @Prop()
  @ApiProperty({ example: 'cyong', description: '用户名称' })
  username: string;

  //用户密码
  @Prop()
  @ApiProperty({ example: '123456', description: '用户密码' })
  password: string;

  //用户邮箱
  @Prop()
  @ApiProperty({ example: 'xxxxx@xxx.com', description: '用户邮箱' })
  email: string;

  //用户头像地址
  @Prop()
  @ApiProperty({ example: 'xxx.', description: '用户头像地址' })
  avatar: string;

  //用户昵称
  @Prop()
  @ApiProperty({ example: 'hotdog', description: '用户昵称' })
  nickname: string;

  //用户角色
  @Prop({ default: UserRole.User })
  @ApiProperty({ example: 'User', description: '用户角色' })
  role: UserRole;

  //用户最近登录时间
  @Prop()
  @ApiProperty({ example: '2022-10-31', description: '用户最近登陆时间' })
  recentlyLanched: Date;

  //用户是否被删除
  @Prop()
  @ApiProperty({
    example: '0 | 1 ',
    description: '用户是否被删除,其中0表示删除,1表示未被删除',
  })
  isDelete: IsDelete;
}

export const UserSchema = SchemaFactory.createForClass(User);

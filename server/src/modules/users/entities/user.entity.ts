import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsDelete, UserRole } from 'src/common/interface/common.interface';

@Entity({ name: 'tb_user' })
export class User {
  //用户id: string;
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  @ApiProperty({ example: 'cyong', description: '用户id' })
  userId: string;

  //用户名
  @Column({ name: 'user_phone', type: 'varchar' })
  @ApiProperty({ example: '150xxxx5678', description: '用户手机号' })
  userphone: string;

  //用户密码
  @Column({ name: 'user_password', type: 'varchar' })
  @ApiProperty({ example: '123456', description: '用户密码' })
  password: string;

  //用户邮箱
  @Column({ name: 'user_email', type: 'varchar' })
  @ApiProperty({ example: 'xxxxx@xxx.com', description: '用户邮箱' })
  email: string;

  //用户头像地址
  @Column({ name: 'user_avatarImgUrl', type: 'varchar' })
  @ApiProperty({ example: 'xxx.', description: '用户头像地址' })
  avatar: string;

  //用户昵称
  @ApiProperty({ example: 'hotdog', description: '用户昵称' })
  @Column({ name: 'user_nickname', type: 'varchar' })
  nickname: string;

  //用户角色
  @ApiProperty({ example: 'User', description: '用户角色' })
  @Column({ name: 'user_role', type: 'enum', enum: UserRole })
  role: UserRole;

  //用户最近登录时间
  @ApiProperty({ example: '2022-10-31', description: '用户最近登陆时间' })
  @CreateDateColumn({ name: 'user_recentlyLanded', type: 'timestamp' })
  recentlyLanched: Date;

  //用户是否被删除
  @ApiProperty({
    example: '0 | 1 ',
    description: '用户是否被删除,其中0表示删除,1表示未被删除',
  })
  @Column({ name: 'user_is_deleted', type: 'enum', enum: IsDelete })
  isDelete: IsDelete;
}

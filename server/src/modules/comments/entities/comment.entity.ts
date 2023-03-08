import { ApiProperty } from '@nestjs/swagger';
import { IsDelete, IsPass } from 'src/common/interface/common.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tb_comment' })
export class Comment {
  @PrimaryGeneratedColumn('uuid', { name: 'comment_id' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '评论id',
  })
  commentId: string;

  @Column({ name: 'comment_blog_id', type: 'varchar' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '评论所属博客id',
  })
  commentBlogId: string;

  @Column({ name: 'comment_answererid', type: 'varchar' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '评论者id',
  })
  commentAnswererid: string;

  @Column({ name: 'comment_fatherid', type: 'varchar' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5 | 0',
    description: '父评论id,可能为空',
  })
  commentFatherid: string;

  @Column({ name: 'comment_body', type: 'varchar' })
  @ApiProperty({ example: '给出相应的评论内容', description: '评论内容' })
  commentBody: string;

  @Column({ name: 'comment_is_deleted', type: 'enum', enum: IsDelete })
  @ApiProperty({
    example: '0 | 1 ',
    description: '评论是否被删除,其中0表示删除,1表示未被删除',
  })
  isDeleted: IsDelete;

  @Column({ name: 'comment_status', type: 'enum', enum: IsPass })
  @ApiProperty({
    example: '0 | 1 ',
    description: '评论是否审核通过,其中0表示审核通过,1表示未被审核',
  })
  isPass: IsPass;

  @ApiProperty({ example: '2022-10-31', description: '创建时间' })
  @CreateDateColumn({ name: 'comment_create_time', type: 'timestamp' })
  commentCreateTime: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDelete } from 'src/common/interface/common.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_blog_tag_relation' })
export class BlogTagRelation {
  @PrimaryGeneratedColumn('uuid', { name: 'btrelation_id' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '博客标签连接表id',
  })
  btrelationId: string;

  @Column({ name: 'btrelation_blog_id', type: 'varchar' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '博客id',
  })
  btrelationBlogId: string;

  @Column({ name: 'btrelation_tag_id', type: 'varchar' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '标签id',
  })
  btrelationTagId: string;

  @Column({ name: 'btrelation_is_deleted', type: 'enum', enum: IsDelete })
  @ApiProperty({ example: '0', description: '该条连接是否被删除' })
  isDeleted: IsDelete;

  @ApiProperty({ example: '2022-10-31', description: '创建时间' })
  @CreateDateColumn({ name: 'btrelation_create_time', type: 'timestamp' })
  btrelationCreateTime: Date;
}

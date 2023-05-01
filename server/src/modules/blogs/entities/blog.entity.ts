import { ApiProperty } from '@nestjs/swagger';
import {
  BlogStatus,
  EnableComment,
  IsDelete,
} from 'src/common/interface/common.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_blog' })
export class Blog {
  @PrimaryGeneratedColumn('uuid', { name: 'blog_id' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '博客id',
  })
  blogId: string;

  @Column({ name: 'blog_title', type: 'varchar' })
  @ApiProperty({ example: '计算机的发展', description: '博客标题' })
  blogTitle: string;

  @Column({ name: 'blog_sub_url', type: 'varchar' })
  @ApiProperty({
    example: 'https://juejin.cn/',
    description: '博客自定义路径url',
  })
  blogSubUrl: string;

  @Column({ name: 'blog_cover_image', type: 'varchar' })
  @ApiProperty({ example: 'https://juejin.cn/', description: '博客封面图地址' })
  blogCoverImage: string;

  @Column({ name: 'blog_content', type: 'mediumtext' })
  @ApiProperty({ example: '哈哈哈', description: '博客内容' })
  blogContent: string;

  @Column({ name: 'blog_category_id', type: 'varchar' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '博客所属板块',
  })
  blogCategoryId: string;

  @Column({ name: 'blog_views', type: 'bigint' })
  @ApiProperty({ example: '1', description: '阅读量' })
  blogViews: number;

  @Column({ name: 'blog_likes', type: 'bigint' })
  @ApiProperty({ example: '1', description: '点赞量' })
  blogLikes: number;

  @Column({ name: 'blog_status', type: 'enum', enum: BlogStatus })
  @ApiProperty({ example: '1', description: '博客状态,0-草稿 1-发布' })
  blogStatus: BlogStatus;

  @Column({ name: 'blog_enable_comment', type: 'enum', enum: EnableComment })
  @ApiProperty({ example: '1', description: '0-允许评论 1-不允许评论' })
  blogEnableComment: EnableComment;

  @Column({ name: 'blog_is_deleted', type: 'enum', enum: IsDelete })
  @ApiProperty({
    example: '0 | 1 ',
    description: '博客是否被删除,其中0表示删除,1表示未被删除',
  })
  isDeleted: IsDelete;

  @ApiProperty({ example: '2022-10-31', description: '创建时间' })
  @CreateDateColumn({ name: 'blog_create_time', type: 'timestamp' })
  blogCreateTime: Date;

  @ApiProperty({ example: '2022-10-31', description: '更新时间' })
  @CreateDateColumn({ name: 'blog_update_time', type: 'timestamp' })
  blogUpdateTime: Date;
}

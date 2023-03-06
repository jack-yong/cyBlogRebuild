import { ApiProperty } from '@nestjs/swagger';
import { IsDelete, linkType } from 'src/common/interface/common.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tb_link' })
export class Link {
  @PrimaryGeneratedColumn('uuid', { name: 'link_id' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '链接id',
  })
  linkId: string;

  @Column({ name: 'link_name', type: 'varchar' })
  @ApiProperty({ example: 'github', description: '友链名称' })
  linkName: string;

  @Column({ name: 'link_description', type: 'varchar' })
  @ApiProperty({ example: '全球最大的同性交友网站', description: '友链描述' })
  linkDescription: string;

  @Column({ name: 'link_url', type: 'varchar' })
  @ApiProperty({
    example: 'https://www.bing.com/?mkt=zh-CN',
    description: '友链地址',
  })
  linkUrl: string;

  @Column({ name: 'link_avater', type: 'varchar' })
  @ApiProperty({
    example: 'https://www.bing.com/?mkt=zh-CN',
    description: '友链图标',
  })
  linkAvater: string;

  @Column({ name: 'link_type', type: 'enum', enum: linkType })
  @ApiProperty({ example: '1', description: '友链类型' })
  linkType: linkType;

  @Column({ name: 'link_rank', type: 'int' })
  @ApiProperty({ example: '1', description: '友链排序' })
  linkRank: number;

  @Column({ name: 'link_is_deleted', type: 'enum', enum: IsDelete })
  @ApiProperty({ example: '0', description: '该条链接是否被删除' })
  isDeleted: IsDelete;

  @ApiProperty({ example: '2022-10-31', description: '创建时间' })
  @CreateDateColumn({ name: 'link_create_time', type: 'timestamp' })
  linkDate: Date;
}

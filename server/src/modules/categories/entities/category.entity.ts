import { ApiProperty } from '@nestjs/swagger';
import { IsDelete } from 'src/common/interface/common.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tb_category' })
export class Category {
  @PrimaryGeneratedColumn('uuid', { name: 'category_id' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '类别id',
  })
  categoryId: string;

  @Column({ name: 'category_name', type: 'varchar' })
  @ApiProperty({ example: '计算机类别', description: '类别名称' })
  categoryName: string;

  @Column({ name: 'category_icon', type: 'varchar' })
  @ApiProperty({ example: '计算机类别', description: '类别图标' })
  categoryIcon: string;

  @Column({ name: 'category_rank', type: 'int' })
  @ApiProperty({
    example: '100',
    description: '分类的排序值 被使用的越多数值越大',
  })
  categoryRank: number;

  @Column({ name: 'category_is_deleted', type: 'enum', enum: IsDelete })
  @ApiProperty({
    example: '0 | 1 ',
    description: '用户是否被删除,其中0表示删除,1表示未被删除',
  })
  isDeleted: IsDelete;

  @ApiProperty({ example: '2022-10-31', description: '创建时间' })
  @CreateDateColumn({ name: 'category_create_time', type: 'timestamp' })
  categoryCreateTime: Date;
}

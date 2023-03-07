import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { IsDelete } from 'src/common/interface/common.interface';

@Entity({ name: 'tb_tag' })
export class Tag {
  @PrimaryGeneratedColumn('uuid', { name: 'tag_id' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '标签id',
  })
  tagId: string;

  @Column({ name: 'tag_name', type: 'varchar' })
  @ApiProperty({ example: 'react', description: '标签名称' })
  tagName: string;

  @Column({ name: 'tag_color', type: 'varchar' })
  @ApiProperty({ example: '#ad7889', description: '标签颜色' })
  tagColor: string;

  @Column({ name: 'tag_is_deleted', type: 'enum', enum: IsDelete })
  @ApiProperty({ example: '0', description: '该条标签是否被删除' })
  isDeleted: IsDelete;

  @ApiProperty({ example: '2022-10-31', description: '创建时间' })
  @CreateDateColumn({ name: 'tag_create_time', type: 'timestamp' })
  tagCreateTime: Date;
}

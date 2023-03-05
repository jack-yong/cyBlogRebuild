import { ApiProperty } from '@nestjs/swagger';
import { devLogType, IsDelete } from 'src/common/interface/common.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tb_devlog' })
export class Devlog {
  @PrimaryGeneratedColumn('uuid', { name: 'dl_id' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '开发日志id',
  })
  devlogId: string;

  @Column({ name: 'dl_title', type: 'varchar' })
  @ApiProperty({ example: '完成后端类别基本curd接口', description: '日志标题' })
  dlTitle: string;

  @Column({ name: 'dl_type', type: 'enum', enum: devLogType })
  @ApiProperty({
    example: '0',
    description:
      '日志类型 0 | 添加新功能,1 | 修复bug,2 | 项目重构,3 | 性能优化',
  })
  dlType: devLogType;

  @Column({ name: 'dl_content', type: 'text' })
  @ApiProperty({ example: '完成了某某功能', description: '日志内容' })
  dlContent: string;

  @Column({ name: 'dl_is_deleted', type: 'enum', enum: IsDelete })
  @ApiProperty({ example: '0', description: '该条日志是否被删除' })
  isDeleted: IsDelete;

  @ApiProperty({ example: '2022-10-31', description: '创建时间' })
  @CreateDateColumn({ name: 'dl_date', type: 'timestamp' })
  dlDate: Date;
}

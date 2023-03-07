import { ApiProperty } from '@nestjs/swagger';
import { IsDelete, IsRead } from 'src/common/interface/common.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tb_leave_message_record' })
export class Lmr {
  @PrimaryGeneratedColumn('uuid', { name: 'lmr_id' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '留言id',
  })
  lmrId: string;

  @Column({ name: 'lmr_answererId', type: 'varchar' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '留言者id',
  })
  lmrAnswererId: string;

  @Column({ name: 'lmr_fatherid', type: 'varchar' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5 | 0',
    description: '父留言者id',
  })
  lmrFatherid: string;

  @Column({ name: 'lmr_content', type: 'text' })
  @ApiProperty({ example: '留言内容', description: '留言内容' })
  lmrContent: string;

  @Column({ name: 'lmr_is_deleted', type: 'enum', enum: IsDelete })
  @ApiProperty({ example: '0', description: '该留言接是否被删除' })
  isDeleted: IsDelete;

  @Column({ name: 'lmr_is_read', type: 'enum', enum: IsRead })
  @ApiProperty({ example: '0', description: '该留言是否被阅读' })
  isRead: IsRead;

  @ApiProperty({ example: '2022-10-31', description: '创建时间' })
  @CreateDateColumn({ name: 'lmr_date', type: 'timestamp' })
  lmrDate: Date;
}

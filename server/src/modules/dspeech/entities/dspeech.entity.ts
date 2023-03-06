import { ApiProperty } from '@nestjs/swagger';
import { IsDelete } from 'src/common/interface/common.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tb_daily_speech' })
export class Dspeech {
  @PrimaryGeneratedColumn('uuid', { name: 'dspeech_id' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '说说id',
  })
  dspeechId: string;

  @Column({ name: 'dspeech_content', type: 'text' })
  @ApiProperty({ example: '50天50个小练习', description: '说说内容' })
  dspeechContent: string;

  @Column({ name: 'dspeech_picsUrl', type: 'varchar' })
  @ApiProperty({ example: 'https://xxx.com', description: '说说封面地址' })
  dspeechPicsUrl: string;

  @Column({ name: 'dspeech_is_deleted', type: 'enum', enum: IsDelete })
  @ApiProperty({ example: '0', description: '该条说说是否被删除' })
  isDeleted: IsDelete;

  @ApiProperty({ example: '2022-10-31', description: '创建时间' })
  @CreateDateColumn({ name: 'dspeech_publishDate', type: 'timestamp' })
  dspeechDate: Date;
}

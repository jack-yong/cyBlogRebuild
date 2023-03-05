import { ApiProperty } from '@nestjs/swagger';
import { IsDelete } from 'src/common/interface/common.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tb_portfolio' })
export class Portfolio {
  @PrimaryGeneratedColumn('uuid', { name: 'portfolio_id' })
  @ApiProperty({
    example: '4a72dabb-7435-6a95-8d4e-fd8b888c56d5',
    description: '作品id',
  })
  portfolioId: string;

  @Column({ name: 'portfolio_title', type: 'varchar' })
  @ApiProperty({ example: '50天50个小练习', description: '作品名称' })
  portfolioTitle: string;

  @Column({ name: 'portfolio_describe', type: 'varchar' })
  @ApiProperty({ example: '50个前端小demo', description: '作品描述' })
  portfolioDescribe: string;

  @Column({ name: 'portfolio_imgurl', type: 'varchar' })
  @ApiProperty({ example: 'https://xxx.com', description: '作品封面地址' })
  portfolioImgurl: string;

  @Column({ name: 'portfolio_url', type: 'varchar' })
  @ApiProperty({ example: 'https://xxx.com', description: '作品地址' })
  portfolioUrl: string;

  @Column({ name: 'portfolio_is_deleted', type: 'enum', enum: IsDelete })
  @ApiProperty({ example: '0', description: '该条作品是否被删除' })
  isDeleted: IsDelete;

  @ApiProperty({ example: '2022-10-31', description: '创建时间' })
  @CreateDateColumn({ name: 'portfolio_date', type: 'timestamp' })
  portfolioDate: Date;
}

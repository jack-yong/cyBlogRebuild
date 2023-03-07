import { Module } from '@nestjs/common';
import { LmrService } from './lmr.service';
import { LmrController } from './lmr.controller';
import { Lmr } from './entities/lmr.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // 在子模块中注册主要使用的是forrFeature方法
    TypeOrmModule.forFeature([Lmr]),
  ],
  controllers: [LmrController],
  providers: [LmrService],
})
export class LmrModule {}

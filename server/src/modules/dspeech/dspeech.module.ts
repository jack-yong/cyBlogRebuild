import { Module } from '@nestjs/common';
import { DspeechService } from './dspeech.service';
import { DspeechController } from './dspeech.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dspeech } from './entities/dspeech.entity';

@Module({
  imports: [
    // 在子模块中注册主要使用的是forrFeature方法
    TypeOrmModule.forFeature([Dspeech]),
  ],
  controllers: [DspeechController],
  providers: [DspeechService],
})
export class DspeechModule {}

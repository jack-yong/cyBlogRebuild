import { Module } from '@nestjs/common';
import { DevlogsService } from './devlogs.service';
import { DevlogsController } from './devlogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devlog } from './entities/devlog.entity';

@Module({
  imports: [
    // 在子模块中注册主要使用的是forrFeature方法
    TypeOrmModule.forFeature([Devlog]),
  ],
  controllers: [DevlogsController],
  providers: [DevlogsService],
})
export class DevlogsModule {}

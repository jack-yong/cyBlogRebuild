import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Blog } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from '../tags/tags.service';
import { BlogTagRelation } from '../tags/entities/blogTagRelation.entiry';
import { Tag } from '../tags/entities/tag.entity';

@Module({
  imports: [
    // 在子模块中注册主要使用的是forrFeature方法
    TypeOrmModule.forFeature([Blog]),
    TypeOrmModule.forFeature([BlogTagRelation]),
    TypeOrmModule.forFeature([Tag]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}

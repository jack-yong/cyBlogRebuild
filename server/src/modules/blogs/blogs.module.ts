import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Blog } from './entities/blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTagRelation } from '../tags/entities/blogTagRelation.entiry';
import { Tag } from '../tags/entities/tag.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { TagsService } from '../tags/tags.service';
import { DevlogsService } from '../devlogs/devlogs.service';
import { Devlog } from '../devlogs/entities/devlog.entity';
import { Category } from '../categories/entities/category.entity';
import { CategoriesService } from '../categories/categories.service';
import { Link } from '../links/entities/link.entity';
import { Lmr } from '../lmr/entities/lmr.entity';
import { Portfolio } from '../portfolio/entities/portfolio.entity';
import { Dspeech } from '../dspeech/entities/dspeech.entity';
import { LmrService } from '../lmr/lmr.service';
import { Comment } from '../comments/entities/comment.entity';
import { CommentsService } from '../comments/comments.service';
import { LinksService } from '../links/links.service';
import { DspeechService } from '../dspeech/dspeech.service';
import { PortfolioService } from '../portfolio/portfolio.service';

@Module({
  imports: [
    // 在子模块中注册主要使用的是forrFeature方法
    TypeOrmModule.forFeature([Blog]),
    TypeOrmModule.forFeature([BlogTagRelation]),
    TypeOrmModule.forFeature([Tag]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Devlog]),
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([Link]),
    TypeOrmModule.forFeature([Lmr]),
    TypeOrmModule.forFeature([Portfolio]),
    TypeOrmModule.forFeature([Dspeech]),
    TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [BlogsController],
  providers: [
    BlogsService,
    UsersService,
    TagsService,
    DevlogsService,
    CategoriesService,
    LmrService,
    CommentsService,
    LinksService,
    DspeechService,
    PortfolioService,
  ],
})
export class BlogsModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { DataSource } from 'typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { DevlogsModule } from './modules/devlogs/devlogs.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { LinksModule } from './modules/links/links.module';
import { DspeechModule } from './modules/dspeech/dspeech.module';
import { TagsModule } from './modules/tags/tags.module';
import { LmrModule } from './modules/lmr/lmr.module';
import { CommentsModule } from './modules/comments/comments.module';
import { BlogsModule } from './modules/blogs/blogs.module';
@Module({
  imports: [
    //将数据库的相关配置异步加载到MongooseModule中
    TypeOrmModule.forRoot({
      type: 'mysql', //数据库类型
      username: 'root', //账号
      password: '141592', //密码
      host: '101.132.119.45', //host
      port: 3306, //端口
      database: 'cyblog', //库名

      // charset: 'utf8mb4',
      // timezone: 'Z', //解决时区问题
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
      // synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
      logging: true,
      retryDelay: 500, //重试连接数据库间隔
      retryAttempts: 10, //重试连接数据库的次数
      autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    UsersModule,
    AuthModule,
    CategoriesModule,
    DevlogsModule,
    PortfolioModule,
    LinksModule,
    DspeechModule,
    TagsModule,
    LmrModule,
    CommentsModule,
    BlogsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

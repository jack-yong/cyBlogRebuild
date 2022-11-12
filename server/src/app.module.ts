import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    //将数据库的相关配置异步加载到MongooseModule中
    MongooseModule.forRoot('mongodb://localhost:27017/CyongBlog'),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

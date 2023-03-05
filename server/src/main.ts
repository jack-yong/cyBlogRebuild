import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist: true, 确保将那些不需要或者无效的属性都自动剥离或者删除
      whitelist: true,
      //当不符合我们设置的dto类型的时候，停止处理并且抛出异常
      forbidNonWhitelisted: true,
      //将传输请求的object转换为我们期望的dto,同时还能自动完成原始类型的转换，例如string转换为number等操作
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  //配置全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  //配置全局拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());
  // 设置swagger文档相关配置
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Cyong-Blog api 文档')
    .setDescription('Cyong-Blog 项目的接口文档')
    .setVersion('1.0')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();

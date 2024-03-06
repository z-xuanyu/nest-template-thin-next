/*
 * @Author: xuanyu
 * @LastEditors: 阿宇 969718197@qq.com
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 15:14:49
 * @LastEditTime: 2024-03-06 13:46:35
 * @Description: 主程序入口文件
 */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationDtoPipe } from './common/pipes/validate-dto.pipe';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // dto参数校验管道
  app.useGlobalPipes(new ValidationDtoPipe());
  // 允许跨域
  app.enableCors();
  // 全局注册错误的过滤器(错误异常)
  app.useGlobalFilters(new HttpExceptionFilter());
  // 上传资源
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public',
  });
  const config = new DocumentBuilder()
    .setTitle('Api文档')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3008);
  console.log('http://localhost:3008/api-docs');
}
bootstrap();

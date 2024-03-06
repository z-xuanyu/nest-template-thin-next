/*
 * @Author: 阿宇 969718197@qq.com
 * @Date: 2024-03-06 11:27:38
 * @LastEditors: 阿宇 969718197@qq.com
 * @LastEditTime: 2024-03-06 11:27:45
 * @Description: web
 */

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [],
})
export class WebModule {}

/*
 * @Author: xuanyu
 * @LastEditors: 阿宇 969718197@qq.com
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 17:18:56
 * @LastEditTime: 2024-03-06 11:35:50
 * @Description: 登录策略和jwt错误 模块
 */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { AuthController } from './auth.controller';
import { WebJwtStrategy } from './web.jwt.strategy';
import { WebLocalStrategy } from './web.local.strategy';
import { UserService } from '../user/user.service';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'xuanyu',
      signOptions: { expiresIn: '720000s' },
    }),
    MulterModule.register({
      dest: './public/uploads',
    }),
  ],
  controllers: [AuthController],
  providers: [WebLocalStrategy, WebJwtStrategy, UserService],
})
export class AuthModule {}

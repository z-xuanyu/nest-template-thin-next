/*
 * @Author: xuanyu
 * @LastEditors: 阿宇 969718197@qq.com
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 17:19:09
 * @LastEditTime: 2024-03-06 13:37:39
 * @Description: 登录控制器
 */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { apiSucceed, ApiSucceedResult } from '@app/common/ResponseResultModel';
import { User } from '@app/db/modules/user.model';
import { WebLoginDto } from './dto/web.login.dto';
import { LoginResultDto } from './dto/login.result.dto';
import { WebRegisterDto } from './dto/web.register.dto';
import { UserService } from '../user/user.service';

@ApiTags('WEB端-登录')
@Controller('web/auth')
export class AuthController {
  // 注入
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @ApiOperation({ summary: 'web站--会员登录' })
  @Post('login')
  @UseGuards(AuthGuard('web-local'))
  async webLogin(
    @Body() dto: WebLoginDto,
    @Req() req: any,
  ): Promise<ApiSucceedResult<LoginResultDto>> {
    // 生成token
    const accessToken = this.jwtService.sign({
      email: req.user.email,
      id: String(req.user._id),
    });
    const data: LoginResultDto = {
      email: req.user.email,
      name: req.user.name,
      accessToken,
    };
    return apiSucceed(data);
  }

  // web端注册
  @Post('register')
  @ApiOperation({ summary: 'web站--注册' })
  async portalRegister(
    @Body() registerDto: WebRegisterDto,
  ): Promise<ApiSucceedResult<User>> {
    const user = await this.userService.create(registerDto);
    return apiSucceed(user);
  }
}

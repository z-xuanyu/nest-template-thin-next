/*
 * @Author: xuanyu
 * @LastEditors: 阿宇 969718197@qq.com
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 17:19:09
 * @LastEditTime: 2024-03-06 13:38:44
 * @Description: 登录控制器
 */
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { apiSucceed, ApiSucceedResult } from '@app/common/ResponseResultModel';
import { Get } from '@nestjs/common/decorators';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AdminLoginDto } from './dto/adminl.login.dto';
import { LoginResultDto } from './dto/login.result.dto';
import { AccountService } from '../account/account.service';
import { AccountDocument } from '@app/db/modules/account.model';

@ApiTags('Admin端-登录')
@Controller('admin/auth')
export class AuthController {
  // 注入
  constructor(
    private jwtService: JwtService,
    private accountService: AccountService,
  ) {}

  @ApiOperation({ summary: '管理站--登录' })
  @Post('login')
  @UseGuards(AuthGuard('admin-local'))
  async adminLogin(
    @Body() dto: AdminLoginDto,
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

  @Get('getUserInfo')
  @UseGuards(AuthGuard('admin-jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取管理端登录人信息' })
  async getUserInfo(@CurrentUser() user: AccountDocument) {
    const id: string = String(user._id);
    const res = await this.accountService.findOne(id);
    return apiSucceed(res);
  }
}

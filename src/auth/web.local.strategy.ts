/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 17:20:13
 * @LastEditTime: 2021-12-27 14:22:56
 * @Description: web站会员登录策略
 */
import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { Inject } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
import { User } from '@app/db/modules/user.model';
import { ApiFail } from '@app/common/ResponseResultModel';

export class WebLocalStrategy extends PassportStrategy(Strategy, 'web-local') {
  constructor(
    @Inject(User.name) private userModel: ReturnModelType<typeof User>,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  // 校验web站 用户和密码
  async validate(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new ApiFail(1001, '账号不存在');
    }
    if (!compareSync(password, user.password)) {
      throw new ApiFail(1002, '密码不正确');
    }
    if (!user.status) {
      throw new ApiFail(1003, '用户已被禁用');
    }
    return user;
  }
}

/*
 * @Author: xuanyu
 * @LastEditors: 阿宇 969718197@qq.com
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 17:20:13
 * @LastEditTime: 2024-03-06 11:25:53
 * @Description: Modify here please
 */
import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcryptjs';
import { ApiFail } from '@app/common/ResponseResultModel';
import { Inject } from '@nestjs/common';
import { Account } from '@app/db/modules/account.model';

export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  'admin-local',
) {
  constructor(
    @Inject(Account.name) private adminModel: ReturnModelType<typeof Account>,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  // 校验管理端 用户和密码
  async validate(email: string, password: string): Promise<Account> {
    console.log(email, password);
    const adminInfo = await this.adminModel
      .findOne({ email })
      .select('+password');
    if (!adminInfo) {
      throw new ApiFail(1001, '账号不存在!');
    }
    if (!compareSync(password, adminInfo.password)) {
      throw new ApiFail(1002, '密码不正确');
    }
    if (!adminInfo.status) {
      throw new ApiFail(1003, '用户已被禁用');
    }
    return adminInfo;
  }
}

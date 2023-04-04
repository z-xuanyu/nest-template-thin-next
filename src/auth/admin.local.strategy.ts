/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 17:20:13
 * @LastEditTime: 2021-12-24 17:48:08
 * @Description: Modify here please
 */
import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcryptjs';
import { Admin } from '@app/db/modules/admin.model';
import { ApiFail } from '@app/common/ResponseResultModel';
import { Inject } from '@nestjs/common';

export class AdminLocalStrategy extends PassportStrategy(
  Strategy,
  'admin-local',
) {
  constructor(
    @Inject(Admin.name) private adminModel: ReturnModelType<typeof Admin>,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  // 校验管理端 用户和密码
  async validate(email: string, password: string): Promise<Admin> {
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

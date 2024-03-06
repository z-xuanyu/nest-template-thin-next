/*
 * @Author: xuanyu
 * @LastEditors: 阿宇 969718197@qq.com
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 17:31:17
 * @LastEditTime: 2024-03-06 10:45:19
 * @Description: 管理站 管理员jwt
 */
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { Inject } from '@nestjs/common';
import { Account } from '@app/db/modules/account.model';

export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    @Inject(Account.name) private accountModel: ReturnModelType<typeof Account>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'xuanyu',
      ignoreExpiration: false,
    } as StrategyOptions);
  }
  async validate(payload: any): Promise<Account> {
    return await this.accountModel.findById(payload.id);
  }
}

/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 17:31:17
 * @LastEditTime: 2021-12-27 10:22:18
 * @Description: 管理站 管理员jwt
 */
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { Admin } from '@app/db/modules/admin.model';
import { Inject } from '@nestjs/common';

export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor(
    @Inject(Admin.name) private adminModel: ReturnModelType<typeof Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'xuanyu',
      ignoreExpiration: false,
    } as StrategyOptions);
  }
  async validate(payload: any): Promise<Admin> {
    return await this.adminModel.findById(payload.id);
  }
}

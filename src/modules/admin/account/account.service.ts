/*
 * @Author: 阿宇 969718197@qq.com
 * @Date: 2024-03-05 15:27:23
 * @LastEditors: 阿宇 969718197@qq.com
 * @LastEditTime: 2024-03-06 11:21:49
 * @Description:
 */

import { ApiFail } from '@app/common/ResponseResultModel';
import { Account } from '@app/db/modules/account.model';
import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateAdminAccountDto } from './dto/create-admin-account.dto';

@Injectable()
export class AccountService {
  // 注入模型
  constructor(
    @Inject(Account.name) private accountModel: ReturnModelType<typeof Account>,
  ) {}

  /**
   *  添加管理员
   */
  async create(ceateAdminAccountDto: CreateAdminAccountDto): Promise<Account> {
    const isHasEmail = await this.accountModel.findOne({
      email: ceateAdminAccountDto.email,
    });

    if (isHasEmail) {
      throw new ApiFail(102, '邮箱已经存在！');
    }

    const result = await this.accountModel.create(ceateAdminAccountDto);
    if (!result) {
      throw new ApiFail(400, '系统异常，请联系管理员');
    }

    return result;
  }

  /**
   *  管理员信息
   *
   * @param {string} id 管理员id
   * @return {*}
   * @memberof AdminService
   */
  async findOne(id: string): Promise<Account> {
    return await this.accountModel.findById(id);
  }
}

/*
 * @Author: 阿宇 969718197@qq.com
 * @Date: 2024-03-05 15:23:30
 * @LastEditors: 阿宇 969718197@qq.com
 * @LastEditTime: 2024-03-06 14:03:30
 * @Description:
 */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountService } from './account.service';
import { CreateAdminAccountDto } from './dto/create-admin-account.dto';
import { ApiSucceedResult, apiSucceed } from '@app/common/ResponseResultModel';
import { Account } from '@app/db/modules/account.model';

@ApiTags('Admin端--账号管理')
@Controller('admin/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @ApiOperation({ summary: '新增管理员' })
  async create(
    @Body() createAdminAccountDto: CreateAdminAccountDto,
  ): Promise<ApiSucceedResult<Account>> {
    const res = await this.accountService.create(createAdminAccountDto);
    return apiSucceed(res);
  }
}

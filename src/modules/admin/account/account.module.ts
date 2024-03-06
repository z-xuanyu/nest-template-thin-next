import { AccountService } from './account.service';
import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}

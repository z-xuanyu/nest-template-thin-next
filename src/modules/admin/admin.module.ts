import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [AuthModule, AccountModule, UserModule],
  controllers: [],
  providers: [],
})
export class AdminModule {}

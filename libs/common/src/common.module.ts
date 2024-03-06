/*
 * @Author: 阿宇 969718197@qq.com
 * @Date: 2024-03-05 15:01:22
 * @LastEditors: 阿宇 969718197@qq.com
 * @LastEditTime: 2024-03-06 13:47:17
 * @Description:
 */
import { DbModule } from '@app/db';
import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { User } from '@app/db/modules/user.model';
import { Account } from '@app/db/modules/account.model';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
      isGlobal: true,
    }),
    DbModule.forRoot('MONGO_URL', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }),
    DbModule.forFeature([Account, User]),
  ],
})
export class CommonModule {}

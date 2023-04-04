import { Admin } from '@app/db/modules/admin.model';
/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 15:54:11
 * @LastEditTime: 2021-12-24 17:56:03
 * @Description: 公共模块
 */
import { DbModule } from '@app/db';
import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { User } from '@app/db/modules/user.model';
import { Category } from '@app/db/modules/category.model';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
      isGlobal: true,
    }),
    DbModule.forRoot('MONGO_URL', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    DbModule.forFeature([Admin, Category, User]),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}

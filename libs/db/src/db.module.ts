/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 15:53:53
 * @LastEditTime: 2021-12-27 16:17:37
 * @Description: 数据库模块
 */
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelForClass, mongoose } from '@typegoose/typegoose';

type ClassType = { new (...args: any[]): any };

@Module({})
export class DbModule {
  // 数据库链接
  static forRoot(envKey: string, options = {}): DynamicModule {
    const providers: Provider[] = [
      {
        provide: 'DB_CONNECTION',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
          const uri = configService.get(envKey);
          return mongoose.connect(uri, options);
        },
      },
    ];
    return {
      module: DbModule,
      providers,
      exports: providers,
      global: true,
    };
  }

  static forFeature(models: ClassType[]): DynamicModule {
    const providers = models.map((model) => {
      return {
        provide: model.name,
        useFactory: () => getModelForClass(model),
      } as Provider;
    });

    return {
      module: DbModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}

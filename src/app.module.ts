import { WebModule } from './modules/web/web.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { CommonModule } from '@app/common/common.module';

@Module({
  imports: [CommonModule, AdminModule, WebModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

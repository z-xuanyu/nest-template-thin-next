import { Module } from '@nestjs/common';
import { MaterialCategoryService } from './material-category.service';
import { MaterialCategoryController } from './material-category.controller';

@Module({
  controllers: [MaterialCategoryController],
  providers: [MaterialCategoryService]
})
export class MaterialCategoryModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { MaterialCategoryController } from './material-category.controller';
import { MaterialCategoryService } from './material-category.service';

describe('MaterialCategoryController', () => {
  let controller: MaterialCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaterialCategoryController],
      providers: [MaterialCategoryService],
    }).compile();

    controller = module.get<MaterialCategoryController>(MaterialCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

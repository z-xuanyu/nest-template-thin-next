import { Test, TestingModule } from '@nestjs/testing';
import { MaterialCategoryService } from './material-category.service';

describe('MaterialCategoryService', () => {
  let service: MaterialCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaterialCategoryService],
    }).compile();

    service = module.get<MaterialCategoryService>(MaterialCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

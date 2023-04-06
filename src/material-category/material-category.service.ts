import { MaterialCategory } from '@app/db/modules/material-category.model';
import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateMaterialCategoryDto } from './dto/create-material-category.dto';
import { UpdateMaterialCategoryDto } from './dto/update-material-category.dto';

@Injectable()
export class MaterialCategoryService {
  constructor(
    @Inject(MaterialCategory.name)
    private materialCategoryModel: ReturnModelType<typeof MaterialCategory>,
  ) {}
  async create(createMaterialCategoryDto: CreateMaterialCategoryDto) {
    return await this.materialCategoryModel.create(createMaterialCategoryDto);
  }

  async findAll() {
    return await this.materialCategoryModel.find();
  }

  async update(
    id: string,
    updateMaterialCategoryDto: UpdateMaterialCategoryDto,
  ) {
    return await this.materialCategoryModel.findByIdAndUpdate(
      id,
      updateMaterialCategoryDto,
    );
  }

  async remove(id: string) {
    return await this.materialCategoryModel.findByIdAndDelete(id);
  }
}

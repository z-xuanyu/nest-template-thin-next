import { Material } from '@app/db/modules/material.model';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { unlink } from 'fs/promises';

@Injectable()
export class MaterialService {
  constructor(
    @Inject(Material.name)
    private materialModel: ReturnModelType<typeof Material>,
  ) {}
  async create(createMaterialDto: CreateMaterialDto) {
    return await this.materialModel.create(createMaterialDto);
  }

  async findAll() {
    return await this.materialModel.find();
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto) {
    return await this.materialModel.findByIdAndUpdate(id, updateMaterialDto);
  }

  async remove(id: string) {
    const info = await this.materialModel.findById(id);
    if (!info) throw new BadRequestException('记录不存在');
    const filePath = info.path;
    try {
      await unlink(filePath);
      await this.materialModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(`文件删除失败`);
    }
  }
}

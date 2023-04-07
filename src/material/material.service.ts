import { Material } from '@app/db/modules/material.model';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { unlink } from 'fs/promises';
import { QueryMaterialDto } from './dto/query-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @Inject(Material.name)
    private materialModel: ReturnModelType<typeof Material>,
  ) {}
  async create(createMaterialDto: CreateMaterialDto) {
    return await this.materialModel.create(createMaterialDto);
  }

  async findAll(parameters: QueryMaterialDto) {
    if (!parameters.type) parameters.type = 'image';
    if(parameters.cid === 'null') parameters.cid = null;
    const query = {
      name: { $regex: new RegExp(parameters.name, 'i') },
      type: parameters.type,
      cid: parameters.cid ? parameters.cid : { $ne: null }
    };
    const total = await this.materialModel.countDocuments(query);
    const list = await this.materialModel
      .find(query)
      .limit(~~parameters.pageSize)
      .skip(~~((parameters.pageNumber - 1) * parameters.pageSize))
      .exec();
    return {
      total,
      items: list,
    };
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

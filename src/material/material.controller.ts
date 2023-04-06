import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { apiSucceed } from '@app/common/ResponseResultModel';

@ApiTags('管理端--素材中心')
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Post()
  @ApiOperation({ summary: '添加素材上传记录' })
  async create(@Body() createMaterialDto: CreateMaterialDto) {
    const res = await this.materialService.create(createMaterialDto);
    return apiSucceed(res);
  }

  @Get()
  @ApiOperation({ summary: '素材列表' })
  async findAll() {
    const res = await this.materialService.findAll();
    return apiSucceed(res);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新素材信息' })
  @ApiParam({ name: 'id', description: '素材文件id' })
  async update(
    @Param('id') id: string,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    const res = await this.materialService.update(id, updateMaterialDto);
    return apiSucceed(res);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  @ApiParam({ name: 'id', description: '素材文件id' })
  async remove(@Param('id') id: string) {
    const res = await this.materialService.remove(id);
    return apiSucceed(res);
  }
}

import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { apiSucceed } from '@app/common/ResponseResultModel';
import { AuthGuard } from '@nestjs/passport';
import { QueryMaterialDto } from './dto/query-material.dto';

@ApiTags('管理端--素材中心')
@UseGuards(AuthGuard('admin-jwt'))
@ApiBearerAuth()
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService) {}

  @Get()
  @ApiOperation({ summary: '素材列表' })
  async findAll(@Query() parameters: QueryMaterialDto) {
    const res = await this.materialService.findAll(parameters);
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

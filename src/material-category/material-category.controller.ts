import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MaterialCategoryService } from './material-category.service';
import { CreateMaterialCategoryDto } from './dto/create-material-category.dto';
import { UpdateMaterialCategoryDto } from './dto/update-material-category.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { apiSucceed } from '@app/common/ResponseResultModel';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('管理端--素材分类')
@UseGuards(AuthGuard('admin-jwt'))
@ApiBearerAuth()
@Controller('material-category')
export class MaterialCategoryController {
  constructor(
    private readonly materialCategoryService: MaterialCategoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: '添加' })
  async create(@Body() createMaterialCategoryDto: CreateMaterialCategoryDto) {
    const res = await this.materialCategoryService.create(
      createMaterialCategoryDto,
    );
    return apiSucceed(res);
  }

  @Get()
  @ApiOperation({ summary: '获取列表' })
  async findAll() {
    const res = await this.materialCategoryService.findAll();
    return apiSucceed(res);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新' })
  @ApiParam({ name: 'id', description: '分类id' })
  async update(
    @Param('id') id: string,
    @Body() updateMaterialCategoryDto: UpdateMaterialCategoryDto,
  ) {
    const res = await this.materialCategoryService.update(
      id,
      updateMaterialCategoryDto,
    );
    return apiSucceed(res);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  @ApiParam({ name: 'id', description: '分类id' })
  async remove(@Param('id') id: string) {
    const res = await this.materialCategoryService.remove(id);
    return apiSucceed(res);
  }
}

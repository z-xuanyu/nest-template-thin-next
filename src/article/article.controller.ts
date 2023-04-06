import { apiSucceed } from '@app/common/ResponseResultModel';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('管理端--文章管理')
@UseGuards(AuthGuard('admin-jwt'))
@ApiBearerAuth()
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({ summary: '新增文章' })
  async create(@Body() createArticleDto: CreateArticleDto) {
    const res = await this.articleService.create(createArticleDto);
    return apiSucceed(res);
  }

  @Get()
  @ApiOperation({ summary: '文章列表' })
  async findAll(@Query() parameters: QueryArticleDto) {
    const { pageNumber = 1, pageSize = 10 } = parameters;
    console.log(pageNumber, pageSize, 999);
    const res = await this.articleService.findAll({
      ...parameters,
      pageNumber,
      pageSize,
    });
    return apiSucceed(res);
  }

  @Get(':id')
  @ApiOperation({ summary: '文章详细' })
  @ApiParam({ name: 'id', description: '文章id' })
  async findOne(@Param('id') id: string) {
    const res = await this.articleService.findOne(id);
    return apiSucceed(res);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: '文章id' })
  @ApiOperation({ summary: '更新文章' })
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const res = await this.articleService.update(id, updateArticleDto);
    return apiSucceed(res);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: '文章id' })
  @ApiOperation({ summary: '删除文章' })
  async remove(@Param('id') id: string) {
    const res = await this.articleService.remove(id);
    return apiSucceed(res);
  }
}

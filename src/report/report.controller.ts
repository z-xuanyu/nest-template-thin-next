import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { apiSucceed } from '@app/common/ResponseResultModel';
import { QueryReportDto } from './dto/query-report.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('管理端--报告管理')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    const res = await this.reportService.create(createReportDto);
    return apiSucceed(res);
  }

  @Get()
  async findAll(@Query() parameters: QueryReportDto) {
    const res = await this.reportService.findAll(parameters);
    return apiSucceed(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.reportService.findOne(id);
    return apiSucceed(res);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    const res = await  this.reportService.update(id, updateReportDto);
    return apiSucceed(res)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = await this.reportService.remove(id);
    return apiSucceed(res);
  }
}

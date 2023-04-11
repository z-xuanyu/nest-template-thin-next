/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-24 15:14:49
 * @LastEditTime: 2021-12-24 15:50:30
 * @Description: Modify here please
 */
import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { FileUploadDto } from './auth/dto/file-upload.dto';
import * as XLSX from 'xlsx';
import { ReportService } from './report/report.service';
import { CreateReportDto } from './report/dto/create-report.dto';
import { apiSucceed } from '@app/common/ResponseResultModel';

@ApiTags('首页')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly reportService: ReportService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload/xlsx')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'xlsx上传',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    const workbook = XLSX.read(file.buffer);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: Array<CreateReportDto> = XLSX.utils.sheet_to_json(worksheet);
    try {
      for (const item of data) {
        item.timeStamp = Date.now();
        await this.reportService.create(item);
      }
    } catch (error) {
      throw new Error(error);
    }
    return apiSucceed('数据导入成功');
  }
}

import { Report } from '@app/db/modules/report.model';
import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateReportDto } from './dto/create-report.dto';
import { QueryReportDto } from './dto/query-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @Inject(Report.name)
    private reportModel: ReturnModelType<typeof Report>,
  ) {}
  async create(createReportDto: CreateReportDto) {
    return await this.reportModel.create(createReportDto); 
  }

  async findAll(parameters: QueryReportDto) {
    const query = {
      title: { $regex: new RegExp(parameters.title, 'i') }
    };
    const total = await this.reportModel.estimatedDocumentCount(query);
    const result = await this.reportModel
      .find(query)
      .limit(~~parameters.pageSize)
      .skip(~~((parameters.pageNumber - 1) * parameters.pageSize))
      .exec();
    return {
      total,
      items: result,
    };
  }

  async findOne(id: string) {
    return await this.reportModel.findById(id)
  }

  async update(id: string, updateReportDto: UpdateReportDto) {
    return await this.reportModel.findByIdAndUpdate(id, updateReportDto)
  }

  async remove(id: string) {
    return await this.reportModel.findByIdAndDelete(id);
  }
}

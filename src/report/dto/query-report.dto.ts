import { PaginationParametersDto } from '@app/common/PaginationParametersDto';
import { ApiProperty } from '@nestjs/swagger';

export class QueryReportDto extends PaginationParametersDto {
  @ApiProperty({ title: '标题', required: false })
  title: string;
}
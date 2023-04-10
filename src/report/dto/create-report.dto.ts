import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  page: string | number;

  @ApiProperty()
  figure: string | number;

  @ApiProperty()
  singleUser: string;

  @ApiProperty()
  multiUser: string;

  @ApiProperty()
  corporateLicense: string;

  @ApiProperty()
  publishedDate: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  tableContent: string;

  @ApiProperty()
  tablesFigure: string;

  @ApiProperty()
  timeStamp?: number;
}

import { PaginationParametersDto } from '@app/common/PaginationParametersDto';
import { ApiProperty } from '@nestjs/swagger';

export class QueryMaterialDto extends PaginationParametersDto {
  @ApiProperty({ title: '文件名称', required: false })
  name: string;

  @ApiProperty({ title: '文件类型', required: false, enum: ['image', 'video'] })
  type: string;

  @ApiProperty({ title: '分类id', required: false, default: null })
  cid?: string | null;
}

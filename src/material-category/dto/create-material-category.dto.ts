import { ApiProperty } from '@nestjs/swagger';

export class CreateMaterialCategoryDto {
  @ApiProperty({ title: '分类名称' })
  name: string;

  @ApiProperty({ title: '父级分类', default: null })
  pid: string | null;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({ title: '文件名' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ title: '文件url' })
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty({ title: '文件路径' })
  @IsNotEmpty()
  @IsString()
  path: string;

  @ApiProperty({ title: '分类id', default: null })
  cid?: string | null;

  @ApiProperty({ title: '文件类型', default: 'image' })
  type: string;
}

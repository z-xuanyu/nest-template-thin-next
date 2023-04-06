import { ApiProperty } from '@nestjs/swagger';
import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { MaterialCategory } from './material-category.model';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Material {
  @ApiProperty({ title: '文件名' })
  @prop({ required: true })
  name: string;

  @ApiProperty({ title: '文件url' })
  @prop({ required: true })
  url: string;

  @ApiProperty({ title: '文件路径' })
  @prop({ required: true })
  path: string;

  @ApiProperty({ title: '分类id' })
  @prop({ ref: () => MaterialCategory, default: null })
  cid: Ref<MaterialCategory> | null;

  @ApiProperty({ title: '文件类型' })
  @prop({ default: 'image' })
  type: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { ModelOptions, prop, Ref } from '@typegoose/typegoose';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
  options: {
    customName: 'material_category',
  },
})
export class MaterialCategory {
  @ApiProperty({ title: '分类名称' })
  @prop({ required: true })
  name: string;

  @ApiProperty({ title: '父级分类' })
  @prop({ ref: () => MaterialCategory, default: null })
  pid: Ref<MaterialCategory> | null;

  @ApiProperty({ title: '分类类型' })
  @prop({ type: String, default: 'image' })
  type?: string;
}

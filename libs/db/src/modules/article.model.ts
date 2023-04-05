import { ApiProperty } from '@nestjs/swagger';
import { ModelOptions, prop, Ref } from '@typegoose/typegoose';
import { Category } from './category.model';

@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Article {
  @ApiProperty({ title: '文章标题' })
  @prop()
  title: string;

  @ApiProperty({ title: '封面图' })
  @prop()
  cover: string;

  @ApiProperty({ title: '文章简介' })
  @prop()
  desc: string;

  @ApiProperty({ title: '文章摘要' })
  @prop()
  digest: string;

  @ApiProperty({ title: '文章作者' })
  @prop({ type: String, default: '管理员' })
  author: string;

  @ApiProperty({ title: '文章内容' })
  @prop({ type: String })
  content: string;

  @ApiProperty({ title: '分类ID' })
  @prop({ ref: () => Category })
  categoryId: Ref<Category>;

  @ApiProperty({ title: '浏览量' })
  @prop({ type: Number, default: 0 })
  views: number;

  @ApiProperty({ title: '排序' })
  @prop({ type: Number, default: 0 })
  sort: number;

  @ApiProperty({ title: '排序' })
  @prop({ type: Boolean, default: true })
  status: boolean;
}

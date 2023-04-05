import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({ title: '文章标题' })
  title: string;

  @ApiProperty({ title: '封面图' })
  cover: string;

  @ApiProperty({ title: '文章简介' })
  desc: string;

  @ApiProperty({ title: '文章摘要' })
  digest: string;

  @ApiProperty({ title: '文章作者' })
  author: string;

  @ApiProperty({ title: '文章内容' })
  content: string;

  @ApiProperty({ title: '分类ID', default: null })
  categoryId: string | null;

  @ApiProperty({ title: '浏览量' })
  views: number;

  @ApiProperty({ title: '排序' })
  sort: number;

  @ApiProperty({ title: '排序' })
  status: boolean;
}

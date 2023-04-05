import { Article } from '@app/db/modules/article.model';
import { Inject, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(Article.name)
    private articleModel: ReturnModelType<typeof Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    return await this.articleModel.create(createArticleDto);
  }

  async findAll(parameters: QueryArticleDto) {
    const query = {
      $and: [
        { title: { $regex: new RegExp(parameters.title, 'i') } },
        { status: parameters.status ?? { $ne: parameters.status } },
      ],
    };
    const total = await this.articleModel.countDocuments(query);
    const list = await this.articleModel
      .find(query)
      .limit(~~parameters.pageSize)
      .skip(~~((parameters.pageNumber - 1) * parameters.pageSize))
      .exec();

    return {
      total,
      items: list,
    };
  }

  async findOne(id: string) {
    const info = await this.articleModel.findById(id);
    return info;
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    return await this.articleModel.findByIdAndUpdate(id, updateArticleDto);
  }

  async remove(id: string) {
    return await this.articleModel.findByIdAndDelete(id);
  }
}

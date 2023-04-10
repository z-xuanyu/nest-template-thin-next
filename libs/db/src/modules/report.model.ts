/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-27 16:13:19
 * @LastEditTime: 2021-12-27 16:15:55
 * @Description: Modify here please
 */

import { ApiProperty } from '@nestjs/swagger';
import { index, ModelOptions, prop } from '@typegoose/typegoose';
// 添加创建时间、更新时间字段
@ModelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@index({ title: 1, timeStamp: 1 })
export class Report {
  @ApiProperty({ title: '标题' })
  @prop({ required: true })
  title: string;

  @prop()
  page: string | number;

  @prop()
  figure: string | number;

  @prop()
  singleUser: string;

  @prop()
  multiUser: string;

  @prop()
  corporateLicense: string;

  @prop()
  publishedDate: string;

  @prop()
  category: string;

  @prop()
  summary: string;

  @prop()
  tableContent: string;

  @prop()
  tablesFigure: string;

  @prop({ type: Number, default: Date.now() })
  timeStamp: number;
}

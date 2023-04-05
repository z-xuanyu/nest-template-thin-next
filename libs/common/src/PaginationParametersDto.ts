/*
 * @Author: xuanyu
 * @LastEditors: xuanyu
 * @email: 969718197@qq.com
 * @github: https://github.com/z-xuanyu
 * @Date: 2021-12-27 17:13:03
 * @LastEditTime: 2021-12-27 17:13:39
 * @Description: Modify here please
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationParametersDto {
  @ApiProperty({
    description: '页码',
    type: Number,
    default: 1,
    required: false,
  })
  @IsOptional()
  pageNumber?: number;

  @ApiProperty({
    description: '页数',
    type: Number,
    default: 10,
    required: false,
  })
  @IsOptional()
  pageSize?: number;
}

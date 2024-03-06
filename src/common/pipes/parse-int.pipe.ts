import { ApiFail } from '@app/common/ResponseResultModel';
import { Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  transform(value: string): any {
    if (isValidObjectId(value)) {
      return value;
    } else {
      throw new ApiFail(101, 'id不存在或者错误');
    }
  }
}

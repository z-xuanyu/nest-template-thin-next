/*
 * @Author: 阿宇 969718197@qq.com
 * @Date: 2024-03-06 13:50:25
 * @LastEditors: 阿宇 969718197@qq.com
 * @LastEditTime: 2024-03-06 13:50:32
 * @Description: is 工具类
 */
export function isExternal(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

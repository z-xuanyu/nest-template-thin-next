import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = exception.message;
    let code = 1001;
    try {
      const messageObj = JSON.parse(exception.message);
      message = messageObj.message;
      code = messageObj.code;
    } catch (e) {}
    Logger.log(exception, '请求错误信息');
    if (message === 'Unauthorized') {
      message = '未登录授权,请先登录!';
    }
    const errorResponse = {
      status,
      message,
      code, // 自定义code
      path: request.url, // 错误的url地址
      method: request.method, // 请求方式
      timestamp: new Date().toLocaleDateString(), // 错误的时间
    };
    // 打印日志
    Logger.error(
      `【${Date.now()}】${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
      'HttpExceptionFilter',
    );
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}

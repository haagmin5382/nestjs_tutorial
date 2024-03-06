import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse(); // controller에서 설정한 에러메세지

    // error 메세지 커스텀
    const customedError = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    if (typeof customedError === 'string') {
      response.status(status).json({
        success: false,
        error: customedError,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      response.status(status).json({
        success: false,
        ...customedError,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    // express : res.status(400).json({...})
    response.status(status).json({
      success: false,
      error: error,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

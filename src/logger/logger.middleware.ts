import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // nestjs는 logging을 할 때 logger라는 class를 사용
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: () => void) {
    // express의 app.use와 비슷

    // response에 대한 결과 값도 logging
    res.on('finish', () => {
      this.logger.log(req.ip, req.method, req.originalUrl); // 요청 정보 logging
      // console.log('logger', req.ip);
      // console.log(req.url);
      this.logger.log(res.statusCode); // 반환했을 때의 정보 logging
    }); // response과 완료되었을 때의 event
    next();
  }
}

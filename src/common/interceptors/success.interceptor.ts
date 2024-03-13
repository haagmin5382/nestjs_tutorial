/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...'); // pre-controller , middleware와는 실행순서가 다르다

    const now = Date.now();
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    ); // post-request
  }
} // AOP

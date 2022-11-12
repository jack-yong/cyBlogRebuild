import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { RCode } from '../constant/rcode';
@Injectable()
//通过拦截器统一处理返回值
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((content) => {
        return {
          data: content.data || {},
          code: content.code || RCode.OK,
          msg: content.msg || null,
        };
      }),
    );
  }
}

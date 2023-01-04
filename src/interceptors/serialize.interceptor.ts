import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { plainToInstance } from 'class-transformer';

// custom decorator to wrap up the usage of this serialization class
export const Serialize = (dto: any) =>
  UseInterceptors(new SerializeInterceptor(dto));

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Runs before a request is handled by the request handler
    return handler.handle().pipe(
      map((data: any) => {
        // Runs before the response is sent back
        const dtoFilteredData = plainToInstance(this.dto, data, {
          // this enables the DTO to exclude all
          // other properties aside from those marked
          // with the "Expose" decorator
          excludeExtraneousValues: true,
        });
        return dtoFilteredData;
      }),
    );
  }
}

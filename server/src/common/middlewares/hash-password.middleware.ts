import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { addSalt, encript } from 'src/utils/encription';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let userPassword = req.body['password'];
    if (userPassword) {
      userPassword = encript(userPassword, addSalt());
      req.body['password'] = userPassword;
    }
    next();
  }
}

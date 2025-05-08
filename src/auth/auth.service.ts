import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  signIn(param: unknown) {
    throw new NotImplementedException();
  }

  createSession(param: unknown) {
    throw new NotImplementedException();
  }
}

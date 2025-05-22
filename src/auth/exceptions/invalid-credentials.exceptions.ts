import { UnauthorizedException } from '@nestjs/common'

export class InvalidCredentialsException extends UnauthorizedException {
  constructor() {
    super('Invalid credentials provided.', undefined);
    this.name = 'InvalidCredentialsError';
  }
}

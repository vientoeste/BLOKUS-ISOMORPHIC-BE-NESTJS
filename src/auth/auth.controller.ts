import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('session')
  async signIn(
    @Body() signInDto: SignInDto
  ) {
    const result = await this.authService.signIn(signInDto);
    return result;
  }
}

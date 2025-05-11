import { Inject, Injectable } from '@nestjs/common';
import { PasswordService } from 'src/password/interfaces/password.interface';
import { SessionService } from 'src/session/interfaces/session.interface';
import { TokenService } from 'src/token/interfaces/token.interface';
import { UserService } from 'src/user/interfaces/user.interface';
import { SignInDto } from './dto/sign-in.dto';
import { UserInfoDto } from 'src/user/dto/user-info.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserService') private readonly userService: UserService,
    @Inject('PasswordService') private readonly passwordService: PasswordService,
    @Inject('SessionService') private readonly sessionService: SessionService,
    @Inject('TokenService') private readonly tokenService: TokenService,
  ) {

  }

  async signIn({ userId, password }: SignInDto): Promise<UserInfoDto> {
    const user = await this.userService.getUserByUserId(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await this.passwordService.comparePassword(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = await this.tokenService.createToken();
    await this.sessionService.createSession({
      token,
      userId: user.userId,
      username: user.username,
    });

    return { id: user.id, userId: user.userId, username: user.username };
  }
}

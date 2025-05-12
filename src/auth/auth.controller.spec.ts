import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserInfoDto } from 'src/user/dto/user-info.dto';

export type StubAuthService = {
  signIn: jest.Mock<Promise<UserInfoDto>, [SignInDto]>;
};

const createMockAuthService = (): StubAuthService => ({
  signIn: jest.fn<Promise<UserInfoDto>, [SignInDto]>(),
});

const MOCK_USER_PROPS = {
  id: 'some-uuid',
  userId: 'someUserId',
  username: 'someUsername',
  password: 'Password123!',
};

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: StubAuthService;

  beforeEach(async () => {
    mockAuthService = createMockAuthService();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /auth/session', () => {
    it('should return HttpStatus.OK and UserInfoDto if available user credential is provided', async () => {
      const { id, password, userId, username } = MOCK_USER_PROPS;
      const mockSignInDto: SignInDto = { password, userId };
      const mockUserInfoDto: UserInfoDto = { id, userId, username };
      mockAuthService.signIn.mockResolvedValue(mockUserInfoDto);

      const result = await controller.signIn(mockSignInDto);

      expect(mockAuthService.signIn).toHaveBeenCalledWith(mockSignInDto);
      expect(result).toEqual(mockUserInfoDto);
    });
  });
});

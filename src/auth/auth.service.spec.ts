import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

const stubUserService = {
  getUserByUserId: jest.fn(),
};

const stubPasswordService = {
  comparePassword: jest.fn(),
};

const stubSessionService = {
  createSession: jest.fn(),
};

const stubTokenService = {
  createToken: jest.fn(),
};

const MOCK_USER_PROPS = {
  id: 'some-uuid',
  userId: 'someUserId',
  username: 'someUsername',
  password: 'Password123!',
};

const MOCK_TOKEN = 'some-session-token';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'UserService', useValue: stubUserService },
        { provide: 'PasswordService', useValue: stubPasswordService },
        { provide: 'SessionService', useValue: stubSessionService },
        { provide: 'TokenService', useValue: stubTokenService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    // [TODO] add user info dto: id, userId, username
    it('should return user info if available user credential is provided', async () => {
      const { id, userId, username, password } = MOCK_USER_PROPS;
      stubUserService.getUserByUserId.mockResolvedValue({ id, userId, username, password });
      stubPasswordService.comparePassword.mockResolvedValue(true);
      stubTokenService.createToken.mockResolvedValue(MOCK_TOKEN);
      stubSessionService.createSession.mockResolvedValue(undefined);

      const signInResult = await service.signIn({
        userId, password,
      });

      expect(stubUserService.getUserByUserId).toHaveBeenCalledWith(userId);
      expect(stubPasswordService.comparePassword).toHaveBeenCalledWith(password, MOCK_USER_PROPS.password);
      expect(stubTokenService.createToken).toHaveBeenCalledTimes(1);
      expect(stubSessionService.createSession).toHaveBeenCalledTimes(1);
      expect(stubSessionService.createSession).toHaveBeenCalledWith(
        expect.objectContaining({
          token: MOCK_TOKEN,
          userId,
          username,
        }),
      );
      expect(signInResult).toEqual({ id, userId, username });
    });
  });
});

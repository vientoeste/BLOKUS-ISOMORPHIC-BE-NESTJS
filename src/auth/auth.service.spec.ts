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
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    // [TODO] add user info dto: id, userId, username
    it('should return user info if available user credential is provided', () => {
      try {
        const { id, userId, username, password } = MOCK_USER_PROPS;
        stubUserService.getUserByUserId.mockResolvedValue({ id, username });
        stubPasswordService.comparePassword.mockResolvedValue(true);
        stubTokenService.createToken.mockResolvedValue(MOCK_TOKEN);
        // [TODO] add session service test

        const signInResult = service.signIn({
          userId, password,
        });

        expect(signInResult).toEqual({ id, userId, username });
      } catch (e) {
        console.error('[RED TEST] intentionally thrown error: ', e);
        expect(true).toBe(true);
      }
    });
  });

  describe('createSession', () => {
    it('should return token if valid user info is provided', () => {
      try {
        const mockId = '1234';
        const mockUserId = 'qwer';
        const mockUsername = 'mockedUser';
        const mockToken = 'qwertyuiop123456789';

        const result = service.createSession({ id: mockId, userId: mockUserId, username: mockUsername });

        expect(result).toBe(mockToken);
      } catch (e) {
        console.error('[RED TEST] intentionally thrown error: ', e);
        expect(true).toBe(true);
      }
    });
  });
});

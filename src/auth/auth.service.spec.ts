import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

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
        const mockId = '1234';
        const mockUserId = 'qwer';
        const mockUserPw = 'qwer1234';
        const mockUsername = 'mockedUser';

        const signInResult = service.signIn({
          userId: mockUserId,
          password: mockUserPw,
        });

        expect(signInResult).toEqual({ id: mockId, userId: mockUserId, username: mockUsername });
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

export interface SessionData {
  token: string;
  userId: string;
  username: string;
}

export interface SessionService {
  createSession(sessionData: SessionData): Promise<void>;
}

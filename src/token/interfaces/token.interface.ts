export interface TokenService {
  createToken(): Promise<string>;
}

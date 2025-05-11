export interface PasswordService {
  comparePassword(password: string, hash: string): Promise<boolean>;
}

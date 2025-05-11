export interface User {
  id: string;
  userId: string;
  username: string;
  password: string;
}

export interface UserService {
  getUserByUserId(userId: string): Promise<User | null>;
}

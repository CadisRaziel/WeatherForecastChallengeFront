import { UserToken } from './UserToken';

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  userToken: UserToken;
}
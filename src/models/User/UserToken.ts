import { Claim } from './Claim';

export interface UserToken {
  id: string;
  email: string;
  claims: Claim[];
}
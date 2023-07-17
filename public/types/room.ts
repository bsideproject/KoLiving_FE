import { User } from './user';

export interface Room {
  userInfo: User;
  images: string[];
  dong: string;
  gu: string;
  deposit: number;
  availableDate: string;
}

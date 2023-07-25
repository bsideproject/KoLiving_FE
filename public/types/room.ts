import { User } from './user';

export const ROOM_TYPE = {
  STUDIO: 'studio',
  ONE_ROOM: 'oneRoom',
  SHARE: 'share',
} as const;

export interface Room {
  userInfo: User;
  images: string[];
  dong: string;
  gu: string;
  deposit: number;
  availableDate: string;
  roomType: (typeof ROOM_TYPE)[keyof typeof ROOM_TYPE];
  bedCount: number;
  bathCount: number;
  housemateCount: number;
  maintenanceFee?: number;
  maintenanceFeeItems?: string[];
  furnishings?: string[];
  description?: string;
}

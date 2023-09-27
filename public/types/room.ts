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

export interface RoomPost {
  locationId: number;
  roomType: "STUDIO" | "ONE_BED_FLATS" | "SHARE_HOUSE";
  //bedrooms: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" | "SIX_OR_OVER";
  bedrooms: string;
  bathrooms: string;
  roommates: string;
  //bathrooms: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" | "SIX" | "SIX_OR_OVER";
  //roommates: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE" | "SIX" | "SIX_OR_OVER";
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
  gasIncluded: boolean;
  waterIncluded: boolean;
  electricityIncluded: boolean;
  cleaningIncluded: boolean;
  furnishingIds: Array<number>;
  //availableDate: Date;
  availableDate: string;
  description: string;
  imageIds : Array<number>;
}
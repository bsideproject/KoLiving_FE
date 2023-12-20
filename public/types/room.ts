import { User } from './user';

export const ROOM_TYPE = {
  STUDIO: 'STUDIO',
  ONE_ROOM: 'ONE_BED_FLATS',
  SHARE: 'SHARE_HOUSE',
} as const;

export type ROOM_TYPE_KEYS = keyof typeof ROOM_TYPE;

export const ROOM_TYPE_LABEL = {
  STUDIO: 'Studio',
  ONE_ROOM: '1 bed flat',
  SHARE: 'Share house',
} as const;

export interface RoomDev {
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
  roomType: keyof typeof ROOM_TYPE;
  bedrooms: string;
  bathrooms: string;
  roommates: string;
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
  gasIncluded: boolean;
  waterIncluded: boolean;
  electricityIncluded: boolean;
  cleaningIncluded: boolean;
  furnishingIds: Array<number>;
  // availableDate: Date;
  availableDate: string;
  description: string;
  imageIds: Array<number>;
}

export interface Furnishing {
  id: number;
  desc: string;
}

export interface FurnishingData {
  createdAt: string;
  deleted: boolean;
  id: number;
  type: string;
  updatedAt: string;
}

export interface RoomFile {
  createdAt: string;
  deleted: boolean;
  id: number;
  path: string;
  size: number;
  updatedAt: string;
}

export interface Room {
  locationId: number;
  roomType: string;
  bedrooms: string;
  bathrooms: string;
  roommates: string;
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
  gasIncluded: boolean;
  waterIncluded: boolean;
  electricityIncluded: boolean;
  cleaningIncluded: boolean;
  furnishingIds: number[];
  availableDate: string;
  description: string;
  imageIds: number[];
}

interface Location {
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
  locationType: string;
  upperLocation: Location | null;
  upperLocationId: number | null;
}

interface RoomInfo {
  roomType: (typeof ROOM_TYPE)[keyof typeof ROOM_TYPE];
  bedrooms: number;
  bathrooms: number;
  roommates: number;
}

export interface ImageFile {
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
  path: string;
  size: number;
}

export interface RoomSearch {
  deleted: boolean;
  createdAt: boolean;
  updatedAt: boolean;
  id: 1;
  location: Location;
  deposit: {
    amount: number;
  };
  monthlyRent: {
    amount: number;
  };
  maintenance: {
    maintenanceFee: {
      amount: number;
    };
    gasIncluded: number;
    waterIncluded: number;
    electricityIncluded: number;
    cleaningIncluded: number;
  };
  roomInfo: RoomInfo;
  furnishings: FurnishingData[];
  availableDate: string;
  available: boolean;
  description: string;
  images?: ImageFile[];
  imageFiles?: ImageFile[];
  user: User;
  furnishingsData?: string[];
}

export interface RoomSearchParams {
  page?: number;
  locationIds?: string;
  minDeposit?: string;
  maxDeposit?: string;
  minMonthlyRent?: string;
  maxMonthlyRent?: string;
  availableDate?: string;
  types?: string;
  furnishingTypes?: string;
}

export interface ContactParams {
  roomId: string;
  contactInfo: string;
  message: string;
}

export interface ReportReason {
  id: number;
  desc: string;
}

export interface ReportParams {
  roomId: string;
  reportId: string;
}

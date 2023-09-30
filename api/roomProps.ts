export interface RoomPostProps {
  locationId: string;
  roomType: 'STUDIO' | 'ONE_BED_FLATS' | 'SHARE_HOUSE';
  bedrooms: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE' | 'SIX_OR_OVER';
  bathrooms: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE' | 'SIX' | 'SIX_OR_OVER';
  roommates: 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE' | 'SIX' | 'SIX_OR_OVER';
  deposit: number;
  monthlyRent: number;
  maintenanceFee: number;
  gasIncluded: boolean;
  waterIncluded: boolean;
  electricityIncluded: boolean;
  cleaningIncluded: boolean;
  furnishingIds: Array<number>;
  availableDate: Date;
  description: string;
  imageIds: Array<number>;
}

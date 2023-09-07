export type FilterType = {
  deposit: boolean;
  typeOfHousing: boolean;
  furnishing: boolean;
  monthRent: boolean;
  location: boolean;
  dateAvailable: boolean;
  [key: string]: string | boolean; // 모든 키와 값이 string 타입임을 명시
};

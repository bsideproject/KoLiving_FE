export type FilterType = {
  deposit: string;
  typeOfHousing: string;
  furnishing: string;
  monthRent: string;
  location: string;
  [key: string]: string; // 모든 키와 값이 string 타입임을 명시
};

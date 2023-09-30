import { Furnishing } from '@/public/types/room';
import { fetchData } from './index';

export const fetchFurnishings = async () => {
  return fetchData<Furnishing[]>('/api/v1/furnishings');
};

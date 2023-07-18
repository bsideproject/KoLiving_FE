import { format } from 'date-fns';

export const formatPrice = (price: number) => {
  return price.toLocaleString();
};

export const formatAge = (year: number) => {
  const now = new Date().getFullYear();
  return now - year;
};

export const formatDate = (date: string) => {
  return format(new Date(date), 'MMM dd yyyy');
};

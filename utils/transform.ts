import { format } from 'date-fns';

export const formatPrice = (price: number) => {
  return price.toLocaleString();
};

export const formatAge = (date: string) => {
  const today = new Date();
  const birthDate = new Date(date);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  const day = today.getDate() - birthDate.getDate();

  if (month < 0 || (month === 0 && day < 0)) {
    return age - 1;
  }
  return age;
};

export const formatDate = (date: string) => {
  return format(new Date(date), 'MMM dd yyyy');
};

export const formatDateForAPI = (date: string) => {
  return format(new Date(date), 'yyyy-MM-dd');
};

export const parseJWT = (token: string) => {
  const base64Payload = token.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64').toString();
  return JSON.parse(payload);
};

export const formatDateForNotification = (date: string) => {
  return format(new Date(date), 'LLL.dd.yyyy HH:mm');
};

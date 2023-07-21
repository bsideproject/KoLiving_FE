export const isRequired = (value: string | number, message = 'Required') => {
  return value ? '' : message;
};

export const isValidEmail = (email: string, message = 'Invalid email') => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return message;
  }
  return true;
};

export const isValidPassword = (password: string, message = 'Invalid password') => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d).{6,30}$/;
  if (!regex.test(password)) {
    return message;
  }
  return true;
};

export const isSamePassword = (password: string, passwordConfirm: string, message = 'Please check again') => {
  if (password !== passwordConfirm) {
    return message;
  }
  return true;
};

export const isValidDate = (date: string, message = 'Invalid date') => {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  const regex2 = /^(0[1-9]|1[0-2])(0[1-9]|1\d|2\d|3[01])(19|20)\d{2}$/;

  if (!regex.test(date) || !regex2.test(date)) {
    return message;
  }
  return true;
};

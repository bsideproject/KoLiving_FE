import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './Select.module.scss';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
  options: Option[];
  size?: 'sm' | 'lg';
}

function Select({ placeholder, register, options, size }: SelectProps) {
  const [placeholderStyle, setPlaceholderStyle] = React.useState(styles.placeholder);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!placeholderStyle) return;

    register.onChange(event);
    setPlaceholderStyle('');
  };

  return (
    <select
      className={`${styles.select} ${placeholderStyle} ${size === 'lg' && styles.lg}`}
      {...register}
      onChange={handleSelectChange}
      defaultValue=""
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

Select.defaultProps = {
  placeholder: '',
  size: 'sm',
};

export default Select;

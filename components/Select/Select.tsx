import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import ReactSelect, { ActionMeta, GroupBase, OnChangeValue, StylesConfig } from 'react-select';
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
  disabled?: boolean;
  onChange?: (selectedValue: string, selectedLabel: string) => void; // 새로운 onChange prop 추가
}

const customStyles: StylesConfig<Option, boolean, GroupBase<Option>> = {
  control: (provided, { isDisabled }) => ({
    ...provided,
    width: '100%',
    borderWidth: '1px',
    borderRadius: '2px',
    minHeight: '48px',
    fontFamily: 'pretendard',
    fontWeight: 'normal',
    border: '1px solid #ccc',
    background: `url('/icons/dropdown.svg') no-repeat right 10px center`,
    backgroundColor: !isDisabled ? '#ffffff' : '#E0E0E0 !important',
    appearance: 'none',
    boxShadow: 'none',
    '&:focus-within': {
      borderColor: '#424242',
    },
    color: !isDisabled ? '' : '#BDBDBD',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#777777',
  }),
  menu: (provided) => ({
    ...provided,
    width: '98%',
    marginTop: '0',
    marginLeft: '1%',
  }),
  option: (provided, { isSelected }) => ({
    ...provided,
    borderColor: '#777777',
    borderWidth: '0 0 0.1px 0',
    fontFamily: 'pretendard',
    backgroundColor: isSelected ? '#FF8E00' : '#ffffff',
  }),
};

function Select({ placeholder, register, options, size, disabled, onChange }: SelectProps) {
  const [placeholderStyle, setPlaceholderStyle] = React.useState(styles.placeholder);
  const disabledStyle = disabled ? styles.disabled : '';
  const handleSelectChange = (newValue: OnChangeValue<any, any>) => {
    // 선택된 value와 label을 부모 컴포넌트로 전달
    onChange?.(newValue.value as string, newValue.label);
  };

  return (
    // <select
    //   className={`${styles.select} ${placeholderStyle} ${size === 'lg' && styles.lg} ${disabledStyle}`}
    //   {...register}
    //   onChange={handleSelectChange}
    //   defaultValue=""
    //   disabled={disabled}
    // >
    //   {placeholder && (
    //     <option value="" disabled hidden>
    //       {placeholder}
    //     </option>
    //   )}
    //   {options.map((option) => (
    //     <option key={option.value} value={option.value}>
    //       {option.label}
    //     </option>
    //   ))}
    // </select>

    <ReactSelect
      {...register}
      onChange={handleSelectChange}
      placeholder={placeholder}
      isDisabled={disabled}
      options={options}
      styles={customStyles}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () => null,
      }}
      isSearchable={false}
    />
  );
}

Select.defaultProps = {
  placeholder: '',
  size: 'sm',
};

export default Select;

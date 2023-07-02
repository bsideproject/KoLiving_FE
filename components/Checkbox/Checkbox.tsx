import React, { useEffect, useMemo, useState } from 'react';
import Check from '@/public/icons/check.svg';
import { UseFormRegisterReturn } from 'react-hook-form';

interface CheckboxProps {
  onChange?: (checked: boolean) => void;
  type?: 'outlined' | 'basic';
  label?: string;
  bold?: boolean;
  required?: boolean;
  register: UseFormRegisterReturn;
  checked?: boolean;
}

export default function Checkbox({
  onChange,
  type = 'basic',
  label = '',
  bold = false,
  required = false,
  register,
  checked = false,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const fillColor = useMemo(() => {
    if (type === 'basic') {
      return isChecked ? 'fill-r1' : 'fill-g3';
    }

    return isChecked ? 'fill-white' : 'fill-g3';
  }, [isChecked, type]);

  const { name } = register;

  const typeClass = useMemo(() => {
    const commonTypeClass = 'rounded-[2px] border-[1px]';

    if (type === 'outlined') {
      if (isChecked) {
        return `${commonTypeClass} bg-r1 border-r1`;
      }

      return `${commonTypeClass} border-g3`;
    }

    return '';
  }, [type, isChecked]);

  const font = useMemo(() => {
    if (bold) {
      return 'font-semibold text-g7';
    }

    return 'font-normal text-g6';
  }, [bold]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    register.onChange(event);
    onChange?.(newChecked);
  };

  const handleCheckClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.stopPropagation(); // 클릭 이벤트 전파 중지
    handleChange(event as any);
  };

  return (
    <div className="flex items-center">
      <div className={`w-[18px] h-[18px] flex items-center p-[1px] ${typeClass} mr-[10px]`}>
        <input
          type="checkbox"
          id={name}
          checked={isChecked}
          className="hidden"
          {...register} // register 객체 전체를 props로 전달
          onChange={handleChange}
        />
        <Check className={`${fillColor} hover:cursor-pointer`} onClick={handleCheckClick} />
      </div>
      <label htmlFor={name} className={`font-pretendard text-[14px] ${font}`}>
        {label}
        {required && <span className="ml-1">*</span>}
      </label>
    </div>
  );
}

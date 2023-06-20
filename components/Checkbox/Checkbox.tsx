import React, { useMemo } from 'react';
import Check from '@/public/icons/check.svg';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  type?: 'outlined' | 'basic';
  label?: string;
  bold?: boolean;
}

export default function Checkbox({ checked, onChange, type = 'basic', label = '', bold = false }: CheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(checked);

  const fillColor = useMemo(() => {
    if (type === 'basic') {
      return isChecked ? 'fill-r1' : 'fill-g3';
    }

    return isChecked ? 'fill-white' : 'fill-g3';
  }, [isChecked, type]);

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

  const handleClick = () => {
    setIsChecked((value) => !value);
    onChange();
  };

  return (
    <div className="flex items-center">
      <div className={`w-[18px] h-[18px] flex items-center p-[1px] ${typeClass} mr-[10px]`}>
        <Check className={`${fillColor} hover:cursor-pointer`} onClick={handleClick} />
      </div>
      <button onClick={handleClick} className={`font-pretendard text-[14px] ${font}`}>
        {label}
      </button>
    </div>
  );
}

import React, { useMemo } from 'react';
import Check from '@/public/icons/check.svg';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  type?: 'outlined' | 'basic';
}

export default function Checkbox({ checked, onChange, type = 'basic' }: CheckboxProps) {
  const [isChecked, setIsChecked] = React.useState(checked);

  const fillColor = useMemo(() => {
    if (type === 'basic') {
      return isChecked ? 'fill-r1' : 'fill-g3';
    }

    return isChecked ? 'fill-white' : 'fill-g3';
  }, [isChecked, type]);

  const typeClass = useMemo(() => {
    const commonTypeClass = 'p-[1px] rounded-[2px] border-[1px]';

    if (type === 'outlined') {
      if (isChecked) {
        return `${commonTypeClass} bg-r1 border-r1`;
      }

      return `${commonTypeClass} border-g3`;
    }

    return '';
  }, [type, isChecked]);

  const handleClick = () => {
    setIsChecked((value) => !value);
    onChange();
  };

  return (
    <div className={`w-[18px] h-[18px] flex items-center ${typeClass}`}>
      <Check className={`${fillColor} hover:cursor-pointer `} onClick={handleClick} />
    </div>
  );
}

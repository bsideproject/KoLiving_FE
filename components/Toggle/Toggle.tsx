import React, { useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import OnIcon from '@/public/icons/on.svg';

interface ToggleProps {
  className?: string;
  register: UseFormRegisterReturn;
}

export default function Toggle({ className, register }: ToggleProps) {
  const [isOn, setIsOn] = useState<boolean>(false);
  const { name } = register;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsOn((prevState) => !prevState);
    inputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    register.onChange(event);
  };

  const defaultStyle = `relative text-white font-bold w-[52px] h-[32px] rounded-full ${isOn ? 'bg-r1' : 'bg-g2'}`;
  return (
    <div>
      <button className={className ? `${defaultStyle} ${className}` : `${defaultStyle}`} onClick={handleToggle}>
        <OnIcon
          className={`absolute inset-0 w-11 h-11 translate-y-1 transition-transform ${isOn ? 'translate-x-6' : ''}`}
        />
      </button>
      <input
        type="checkbox"
        id={name}
        checked={isOn}
        className="hidden"
        {...register}
        onChange={handleChange}
        ref={(el) => {
          inputRef.current = el;
          register.ref(el);
        }}
      />
    </div>
  );
}

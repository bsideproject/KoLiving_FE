import React, { useState } from 'react';
import OnIcon from '@/public/icons/on.svg';

interface ToggleProps {
  className?: string;
}

export default function Toggle({ className }: ToggleProps) {
  const [isOn, setIsOn] = useState<boolean>(false);
  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  const defaultStyle = `relative text-white font-bold w-[52px] h-[32px] rounded-full ${isOn ? 'bg-r1' : 'bg-g2'}`;
  return (
    <div>
      <button className={className ? `${defaultStyle} ${className}` : `${defaultStyle}`} onClick={handleToggle}>
        <OnIcon
          className={`absolute inset-0 w-11 h-11 translate-y-1 transition-transform ${isOn ? 'translate-x-6' : ''}`}
        />
      </button>
    </div>
  );
}

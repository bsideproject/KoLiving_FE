import React, { useState } from 'react';
import OnIcon from '@/public/icons/on.svg';

export default function Toggle() {
  const [isOn, setIsOn] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
  };

  return (
    <div>
      <button
        className={`relative text-white font-bold w-[52px] h-[32px] rounded-full ${isOn ? 'bg-r1' : 'bg-g2'}`}
        onClick={handleToggle}
      >
        <OnIcon
          className={`absolute inset-0 w-11 h-11 translate-y-1 transition-transform ${isOn ? 'translate-x-6' : ''}`}
        />
      </button>
    </div>
  );
}

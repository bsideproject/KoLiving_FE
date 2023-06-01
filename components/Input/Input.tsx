import React from 'react';

function Input() {
  return (
    <div>
      <input
        className="border-g4 border-solid border-[1px] rounded-[2px] bg-g0 max-w-[335px] h-[48px] focus:border-g6 placeholder-g4 pl-[12px]"
        placeholder="hint"
      />
      <p className="text-a1 font-pretendard text-[14px] max-w-[335px] h-[14px] mt-[4px]">주의사항</p>
    </div>
  );
}

export default Input;

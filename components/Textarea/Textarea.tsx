import React, { useState, useEffect } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps {
  placeholder?: string;
  maxByte?: number;
  maxLength?: number;
  register: UseFormRegisterReturn;
  initValue?: string;
  className?: string;
  readonly?: boolean;
}

const getByteSize = (str: string) => {
  return new Blob([str]).size;
};

function Textarea({ placeholder, register, maxByte, maxLength, initValue, className, readonly }: TextareaProps) {
  const [byteCount, setByteCount] = useState(0);
  const [textValue, setTextValue] = useState(initValue || '');

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let currentText = e.target.value;
    let currentByte = getByteSize(currentText);

    // byte 수가 초과 될 경우
    if (maxByte && currentByte >= maxByte) {
      // 초과되는 byte를 제거하기 위해 글자를 줄여나간다.
      while (currentByte > maxByte) {
        currentText = currentText.slice(0, -1);
        currentByte = getByteSize(currentText);
      }
      e.target.value = currentText;
    }

    // 글자수가 초과 될 경우
    if (maxLength && currentText.length >= maxLength) {
      // 초과되는 글자수를 제거하기 위해 글자를 줄여나간다.
      while (currentText.length > maxLength) {
        currentText = currentText.slice(0, -1);
      }
      e.target.value = currentText;
    }

    setTextValue(currentText);
    setByteCount(currentByte);

    register.onChange(e);
  };

  return (
    <div className="flex flex-col space-y-2">
      <textarea
        className={`w-full rounded-[2px] resize-none pl-[14px] font-normal pt-[14px] focus:border-g6 focus:outline-none ${
          className || 'border-g4 border-[1px] h-[120px]'
        }`}
        placeholder={placeholder}
        {...register}
        onChange={handleTextareaChange}
        maxLength={maxLength}
        value={textValue}
        readOnly={readonly}
        // readOnly={!!((maxByte && byteCount >= maxByte) || (maxLength && textValue.length >= maxLength)) }
      />
      {(maxByte || 0) > 0 && (
        <div className="text-right text-g5 text-[14px] font-normal">
          {byteCount} / {maxByte} byte
        </div>
      )}
    </div>
  );
}

export default Textarea;

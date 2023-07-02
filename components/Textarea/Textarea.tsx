import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextareaProps {
  placeholder?: string;
  value?: string;
  register: UseFormRegisterReturn;
}

function Textarea({ placeholder, register }: TextareaProps) {
  return (
    <textarea
      className="w-full h-[120px] rounded-[2px] border-g4 border-[1px] resize-none pl-[14px] pt-[14px] focus:border-g6 focus:outline-none"
      placeholder={placeholder}
      {...register}
    />
  );
}

export default Textarea;

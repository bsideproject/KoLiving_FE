/* eslint-disable react/react-in-jsx-scope */
import React, { ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface Option {
  value: string;
  label: string;
}

interface RadioProps {
  options: Option[];
  selectedOption?: string;
  onChange?: (value: string) => void;
  register: UseFormRegisterReturn;
}

const isSelectedBackground = (selectedOption: string | undefined, value: string) => {
  if (selectedOption === value) {
    return 'bg-r1 !text-g0';
  }

  return '';
};

function Radio({ options, selectedOption, onChange, register }: RadioProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    register.onChange(event);
    onChange?.(value);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex h-[48px] rounded-[2px] text-[16px] w-full">
        <fieldset className="flex flex-1">
          {options.map((option, index) => (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label
              key={`option-${index}`}
              className={`flex-1 border border-gray-300 ${
                index > 0 ? 'ml-[-1px]' : ''
              } flex items-center justify-center text-g5 ${isSelectedBackground(selectedOption, option.value)}`}
            >
              <input
                type="radio"
                value={option.value}
                defaultChecked={index === 0}
                className="hidden w-4 h-4 text-indigo-600 form-radio"
                {...register}
                onChange={handleChange}
              />
              <span className="font-[500]">{option.label}</span>
            </label>
          ))}
        </fieldset>
      </div>
    </div>
  );
}

export default Radio;

Radio.defaultProps = {
  selectedOption: '',
};

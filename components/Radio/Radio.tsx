/* eslint-disable react/react-in-jsx-scope */
import React, { ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
}

interface RadioProps {
  options: Option[];
  selectedOption?: string;
  onChange: (value: string) => void;
}

function Radio({ options, selectedOption, onChange }: RadioProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label key={option.value} className="flex items-center space-x-2">
          <input
            type="radio"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={handleChange}
            className="form-radio text-indigo-600 h-4 w-4"
          />
          <span className="text-gray-900">{option.label}</span>
        </label>
      ))}
    </div>
  );
}

export default Radio;

Radio.defaultProps = {
  selectedOption: '',
};

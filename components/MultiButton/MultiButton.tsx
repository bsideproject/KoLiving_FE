import React, { useCallback, useEffect, useMemo } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Button from '../Button/Button';
import { Option } from '../Radio/Radio';

interface MultiButtonProps {
  options: Option[];
  register: UseFormRegisterReturn;
  onChange?: (value: string) => void;
}

function MultiButton({ options, register }: MultiButtonProps) {
  const [selected, setSelected] = React.useState<Option>();

  const handleButtonClick = (value: string) => {
    const selectedButton = options.find((option) => option.value === value);

    if (!selectedButton) {
      return;
    }

    setSelected(selectedButton);
  };

  const getButtonColor = useCallback(
    (value: string) => {
      return selected?.value === value ? 'r1' : 'outlined';
    },
    [selected]
  );

  useEffect(() => {
    const customEvent = {
      target: {
        name: register.name,
        value: selected,
      },
    };
    register.onChange(customEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    setSelected(options[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`mb-3 grid  gap-0 grid-cols-${options.length}`}>
      {options.map((option, index) => (
        <div key={`option-${index}`} className="col-span-1">
          <Button
            size="lg"
            type="button"
            onClick={() => handleButtonClick(option.value)}
            color={getButtonColor(option.value)}
          >
            {option.label}
          </Button>
        </div>
      ))}
    </div>
  );
}

export default MultiButton;

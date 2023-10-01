import React, { useState, useEffect } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './Stepper2.module.scss';

interface StepperProps {
  disabled?: boolean;
  disabledLeft?: boolean;
  disabledRight?: boolean;
  initCount: number;
  callbackCount?: (count: number) => void;
  register: UseFormRegisterReturn;
}

/**
 * @see Stepper + - Component
 */
export default function Stepper2({
  disabled,
  disabledLeft,
  disabledRight,
  initCount,
  callbackCount,
  register,
}: StepperProps) {
  const [count, setCount] = useState(initCount || 0);

  useEffect(() => {
    setCount(initCount);
  }, [initCount]);

  const sendCount = (_count: number) => {
    callbackCount?.(_count);
  };

  useEffect(() => {
    const customEvent = {
      target: {
        name: register.name,
        value: count,
      },
    };
    register.onChange(customEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className={styles.stepper_container}>
      <button
        type="button"
        className={`${styles.rounded} ${(disabled || disabledLeft) && styles.disabled} `}
        onClick={() => {
          setCount(count - 1);
          sendCount(count - 1);
        }}
        disabled={disabled || disabledLeft}
      >
        -
      </button>
      <span className="w-10 inline-block text-center font-bold text-g7">{count}</span>
      <button
        type="button"
        className={`${styles.rounded} ${(disabled || disabledRight) && styles.disabled} `}
        onClick={() => {
          setCount(count + 1);
          sendCount(count + 1);
        }}
        disabled={disabled || disabledRight}
      >
        +
      </button>
    </div>
  );
}

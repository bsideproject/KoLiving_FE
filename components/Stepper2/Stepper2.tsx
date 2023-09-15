import React, { useState } from 'react';
import styles from './Stepper2.module.scss';


interface StepperProps {
    disabled ?: boolean
}

export default function Stepper2 ( { disabled }: StepperProps )  {
  const [count, setCount] = useState(1);

  return (
    <div className={styles.stepper_container}>
      <button 
        type="button"
        className={`${styles.rounded} ${disabled ? styles.disabled : ''} `}
        onClick={() => setCount(count - 1)}
        disabled={disabled}
      >-
      </button>
      <span className='w-10 inline-block text-center font-bold text-g7'>{count}</span>
      <button 
        type="button"
        className={`${styles.rounded} ${disabled ? styles.disabled : ''} `}
        onClick={() => setCount(count + 1)}
        disabled={disabled}
      >+</button>
    </div>
  );
};

import React, { useMemo, useState } from 'react';
import ReactCalendar, { TileContentFunc } from 'react-calendar';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { format } from 'date-fns';
import styles from './Calendar.module.scss';
import Button from '../Button/Button';

interface InputProps {
  placeholder?: string;
  register: UseFormRegisterReturn;
  type?: string;
  error?: FieldError;
  maxLength?: number;
  disabled?: boolean;
}

export default function Calendar({ placeholder, register, error, disabled }: InputProps) {
  const hasError = error && error.message;
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const toggleCalendar = () => {
    setIsCalendarShow((state) => !state);
  };

  return (
    <div className="relative w-full">
      <input
        className={`${styles.input} ${hasError ? styles.error : ''}`}
        placeholder={placeholder}
        disabled={disabled}
        readOnly
        onClick={toggleCalendar}
        {...register}
      />
      {isCalendarShow && (
        <div className="border-[#bdbdbd] border-[1px] absolute bg-g0">
          <ReactCalendar
            prev2Label={null}
            next2Label={null}
            maxDetail="month"
            minDetail="month"
            calendarType="US" // 일요일부터 시작
            formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
          />

          <div className="grid grid-flow-col gap-[99px] p-[12px]">
            <div className="min-w-[108px]">
              <Button color="outlined" size="lg" onClick={toggleCalendar}>
                Cancel
              </Button>
            </div>
            <div className="min-w-[108px]">
              <Button size="lg">Apply</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

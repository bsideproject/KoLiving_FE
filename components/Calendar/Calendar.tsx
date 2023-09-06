import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCalendar from 'react-calendar';
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
  value?: string;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendar({ placeholder, register, error, disabled, value }: InputProps) {
  const hasError = error && error.message;
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const [dateValue, setDateValue] = useState<string>(value || '');
  const [originDateValue, setOriginDateValue] = useState<string>(value || '');

  useEffect(() => {
    const handleClickOutside = (e: TouchEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsCalendarShow(false);
      }
    };

    // 마운트 시 이벤트 등록
    document.addEventListener('touchend', handleClickOutside);

    // 언마운트 시 이벤트 해제
    return () => {
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, []);

  const toggleCalendar = () => {
    setIsCalendarShow((state) => !state);
  };

  useEffect(() => {
    if (!isCalendarShow) {
      setDateValue(originDateValue);
    }
  }, [isCalendarShow, setDateValue, originDateValue]);

  const changeDate = (date: Value) => {
    setDateValue(format(date as Date, 'MM-dd-yyyy'));
  };

  const applyDate = useCallback(() => {
    const customEvent = {
      target: {
        name: register.name,
        value: dateValue,
      },
    };

    setOriginDateValue(dateValue);
    register.onChange(customEvent);
    toggleCalendar();
  }, [dateValue, register]);

  return (
    <div className="relative w-full">
      <input
        className={`${styles.input} ${hasError ? styles.error : ''}`}
        placeholder={placeholder}
        disabled={disabled}
        onClick={toggleCalendar}
        readOnly
        value={originDateValue}
        {...register}
      />
      {isCalendarShow && (
        <div className="border-[#bdbdbd] border-[1px] absolute bg-g0" ref={calendarRef}>
          <ReactCalendar
            value={dateValue}
            onChange={changeDate}
            prev2Label={null}
            next2Label={null}
            maxDetail="month"
            minDetail="month"
            calendarType="US" // 일요일부터 시작하도록 한다
            formatShortWeekday={(locale, date) => ['S', 'M', 'T', 'W', 'T', 'F', 'S'][date.getDay()]}
          />

          <div className="grid grid-flow-col gap-[99px] p-[12px]">
            <div className="min-w-[108px]">
              <Button color="outlined" size="lg" onClick={toggleCalendar}>
                Cancel
              </Button>
            </div>
            <div className="min-w-[108px]">
              <Button size="lg" onClick={applyDate}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

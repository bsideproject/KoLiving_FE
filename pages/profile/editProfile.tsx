import React, { useState } from 'react';
import { FieldError, useForm as UseForm } from 'react-hook-form';
import useModal from '@/hooks/useModal.ts';
import { isValidEmail } from '@/utils/validCheck.ts';
import {
  Textarea,
  Button,
  Input,
} from '@/components/index.tsx';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import Calendar from '@/components/Calendar/Calendar.tsx';

import ProfileCamera from '@/public/icons/profileCamera.svg';

interface ProfileProps {
    name?: string;
    age?: number;
    gender?: 'Male' | 'Female';
    imageSrc : string;
};

export default function EditProfile({ imageSrc }: ProfileProps) {
  const { openModal, closeModal } = useModal();
  const subHeader = 'font-pretendard font-semibold text-[16px]';
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = UseForm({ mode: 'onChange' });
  const [buttonState, setButtonState] = useState('Male');
  const [isCalendarShow, setCalendarShow] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    openModal({
      props: {
        title: 'My Postings',
        size: 'full',
        custom: true,
        customHeader: true,
      },
      children: <>hi</>,
    });
  };
 
  const handleCalendarShow = (isShow: boolean) => {
    setCalendarShow(isShow);
  }

  const isPostingComplete = () => {
    return true;
  }

  const handleButtonClick = (value: string) => {
    setButtonState(value);
  };

  const getButtonColor = (value: string) => {
    return buttonState === value ? 'r1' : 'outlined';
  };
  
  const genderButtons = [
    { label: 'Male'},
    { label: 'Female'},
    { label: 'Others'}
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-screen overflow-y-scroll font-pretendard">
            <div className="flex justify-center items-center h-[90px] mt-[20px] mb-[36px]">
                <div style={{ position: 'relative', width: 90, height: 90 }} className="flex items-center justify-center">
                    <div style={{ borderRadius: '50%', overflow: 'hidden', width: '100%', height: '100%' }} className="flex items-center justify-center">
                        <img src={imageSrc} alt={`${name}'s profile`} className="object-cover" />
                    </div>
                    <div className="absolute border-g2 border-[1px] bottom-0 right-0 bg-g0 flex items-center justify-center" style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: "" }}>
                        <ProfileCamera className="w-[20px] h-[20px]" />
                    </div>
                </div>
            </div>

            <div className="mb-[12px]">
                <div className={subHeader}>Email</div>
            </div>
            <div className="mb-[8px]">
                <Input
                    type="email"
                    placeholder="Your email"
                    register={register('email', {
                        validate: (value) => {
                        return isValidEmail(value, `Invalid email`);
                        },
                    })}
                    error={errors.email as FieldError}
                />
            </div>
            <div className="py-[28px]">
                <div className="mb-[12px]">
                    <div className={subHeader}>Name</div>
                </div>
                <div className="mb-[8px]">
                    <Input
                        placeholder="First Name"
                        type="text"
                        register={register('firstName', {
                        validate: () => {
                            return true;
                        },
                        })}
                    />
                </div>
                <div className="mb-[8px]">
                    <Input
                        placeholder="Last Name"
                        type="text"
                        register={register('lastName', {
                        validate: () => {
                            return true;
                        },
                        })}
                    />
                </div>
            </div>
            <div className="mb-[12px]">
                <div className={subHeader}>Gender</div>
            </div>
            <div className="mb-[32px]">
                <div className="mb-3 grid grid-cols-3 gap-0 text-g0">
                    {genderButtons.map( (button,index) => (
                        <div key={button.label + index} >
                            <Button 
                                size="lg"
                                type="button"
                                color={getButtonColor(button.label)}
                                onClick={() => handleButtonClick(button.label)}
                            >
                            {button.label}
                            </Button>
                        </div>
                        ))}
                </div>
            </div>
            <div className="mb-[12px]">
                <div className={subHeader}>Date of birth</div>
            </div>
            <section className='mb-[8px]'>
                <Calendar placeholder="MM-DD-YYYY" type="text" register={register('dateAvailable')} disabled={watch('availableChecked')} handleCalendarShow={handleCalendarShow}/>
            </section>
            <div className="mb-[12px] mt-[32px]">
                <div className={subHeader}>About you</div>
            </div>
            <div className="mb-[250px]">
                <Textarea placeholder={"Describe you to others!"} register={register('describe')} maxByte={250} className={'h-[172px] text-g7 border-g4 border-[1px]'}/>
            </div>
            <div className="mt-[255px] fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
                <div className="w-full">
                    <div className="mb-[13px]">
                        <Button 
                            size="lg" 
                            type="submit" 
                            disabled={isPostingComplete()} 
                            onClick={() => {}}
                        >
                        {"Complete"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </form>
  );
}

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import Router, { useRouter } from 'next/router';
import {
  Stepper,
  Stepper2,
  Typography,
  Checkbox,
  Button,
} from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['filter', 'common'])),
  },
});

export default function Step1() {
  console.log('useRouter >>', useRouter());
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const [selectedButton, setSelectedButton] = useState('Studio');
  const [buttonState, setButtonState] = useState('YES');
  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    Router.push('/room/addRoom/step3');
  };

  const buttons = [
    { label: 'Studio'},
    { label: '1bed flat'},
    { label: 'Share house'}
  ];

  const handleButtonClick = (label: string) => {
    setSelectedButton(label);
  };

  const getButtonColor = (label: string) => {
    return selectedButton === label ? 'r1' : 'outlined';
  }

  const handleYNButtonClick = (value: string) => {
    setButtonState(value);
  };

  const getYNButtonColor = (value: string) => {
    return buttonState === value ? 'r1' : 'outlined';
  };

  return (
    <>
      <Stepper step={2} totalStep={3} />
      <div className="h-screen overflow-y-scroll">
        <div className="mt-[9px] mb-[20px]" key="filter">
          <Typography variant="header" fontStyle="semiBold">
            Fill in the details
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-6/7 sm:w-1/2 md:w-3/7 lg:w-1/4 xl:w-1/5">
          <div className="mb-[4px]">
            <Typography variant="body" customClassName="text-[16px] font-bold text-g7 mb-[16px]">
              Type of housing
            </Typography>
          </div>
          <div className="mb-[32px]">
            <div className="mb-3 grid grid-cols-3 gap-0 text-g0">
              {buttons.map( (button,index) => (
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

          <hr />

          <div className="py-[28px]">
            <div className="mb-[16px]">
              <Typography variant="body" customClassName="text-[16px] font-bold text-g7">
                House Information
              </Typography>
            </div>
            <div className="flex justify-between items-center mb-[8px]">
              <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
                Total bedrooms
              </Typography>
              <Stepper2 disabled={true}/>
            </div>
            <div className="flex justify-between items-center mb-[8px]">
              <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
                Total bathrooms
              </Typography>
              <Stepper2 />
            </div>
            <div className="flex justify-between items-center mb-[8px]">
              <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
                Total roommates
              </Typography>
              <Stepper2 />
            </div>
          </div>

          <hr />
          
          <div className="mb-[4px] mt-[32px]">
            <Typography variant="body" customClassName="text-[16px] font-bold text-g7">
              Furnished
            </Typography>
          </div>
          <div className="mb-[16px]">
            <div className="mb-3 grid grid-cols-2 gap-0">
              <div className="col-span-1">
                <Button size="lg" type="button" onClick={() => handleYNButtonClick('YES')} color={getYNButtonColor('YES')} >
                  YES
                </Button>
              </div>
              <div className="col-span-1">
                <Button size="lg" type="button" onClick={() => handleYNButtonClick('NO')} color={getYNButtonColor('NO')} >
                  NO
                </Button>
              </div>
            </div>
          </div>
          {
            (buttonState === 'YES') &&
            <div className="grid grid-cols-2 gap-[12px] mt-[16px]">
              <Checkbox
                type="outlined"
                label="Bed"
                register={register('gasChecked')}
                checked={watch('gasChecked')}
              />
              <Checkbox
                type="outlined"
                label="Wardrobe"
                register={register('waterChecked')}
                checked={watch('waterChecked')}
              />
              <Checkbox
                type="outlined"
                label="TV"
                register={register('electricityChecked')}
                checked={watch('electricityChecked')}
              />
              <Checkbox
                type="outlined"
                label="Air conditioner"
                register={register('cleaningChecked')}
                checked={watch('cleaningChecked')}
              />
              <Checkbox
                type="outlined"
                label="Heater"
                register={register('electricityChecked')}
                checked={watch('electricityChecked')}
              />
              <Checkbox
                type="outlined"
                label="Washing machine"
                register={register('cleaningChecked')}
                checked={watch('cleaningChecked')}
              />
              <Checkbox
                type="outlined"
                label="Stove"
                register={register('electricityChecked')}
                checked={watch('electricityChecked')}
              />
              <Checkbox
                type="outlined"
                label="Refrigerator"
                register={register('cleaningChecked')}
                checked={watch('cleaningChecked')}
              />
              <Checkbox
                type="outlined"
                label="Door lock"
                register={register('electricityChecked')}
                checked={watch('electricityChecked')}
              />
            </div>
          }
          <div className=" fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
            <div className="w-full">
              <div className="mb-[13px]">
                <Button size="lg" type="submit" disabled={true}>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

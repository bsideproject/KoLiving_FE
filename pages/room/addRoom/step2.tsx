import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import Router, { useRouter } from 'next/router';
import {
  Stepper,
  Select,
  Typography,
  Checkbox,
  Button,
} from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { GuList, DongList } from '@/public/js/guDongList.ts';
import { Option } from '@/components/Select/Select';
import { GuDong } from '../addRoom';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['filter', 'common'])),
  },
});

export default function Step1() {
  const filterTranslation = useTranslation('filter');
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const [guValue, setGuValue] = useState<Option>({
    value: '',
    label: '',
  });
  // const modalSetter = React.useContext(ModalSetterContext);
  const [dongValue, setDongValue] = useState<GuDong>({
    gu: '',
    guLabel: '',
    value: '',
    label: '',
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    Router.push('/room/addRoom/step3');
  };

  // 옵션 선택 시 실행될 함수, 유효성 검증
  const handleOptionSelect = useCallback(() => {
    if (!dongValue.label) return;

    let resultOptions: string[];
    const option = dongValue.label;
    setSelectedOptions((prevSelectedOptions) => {
      const isExist = prevSelectedOptions.some((item) => item.includes(option));
      // Location이 5개 이상 선택 될 경우 Toast 노출
      if (prevSelectedOptions.length >= 5) {
        
        return [...prevSelectedOptions];
      }

      if (!isExist) {
        resultOptions = [...prevSelectedOptions, guValue?.label.concat(`, ${option}`)];
      } else {
        // TODO translation 사용해서 여기 나중에 바꿔줘야함
        resultOptions = prevSelectedOptions;
      }
      return [...resultOptions];
    });
  }, [dongValue.label, guValue?.label]);
  
  useEffect(() => {
    handleOptionSelect();
  }, [dongValue.label, handleOptionSelect]);

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
          <div className="mb-[14px]">
            <div className="mb-3 grid grid-cols-3 gap-0 text-g0">
              <div className="col-span-1 text-[16px] text-g0">
                <Button size="lg" type="button" disabled={false}>
                  Studio
                </Button>
              </div>
              <div className="col-span-1 text-[16px] bg-g0">
                <Button size="lg" type="button" disabled={false}>
                  1bed flat
                </Button>
              </div>
              <div className="col-span-1 text-[16px]">
                <Button size="lg" type="button" disabled={false}>
                  Share house
                </Button>
              </div>
            </div>
          </div>
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
            </div>
            <div className="mb-[8px]">
              <Select
                options={[]}
                register={register('dateAvailable')}
                placeholder={"Select"}
              />
              <Select
                options={[]}
                register={register('dateAvailable')}
                placeholder={"Select"}
              />
              <Select
                options={[]}
                register={register('dateAvailable')}
                placeholder={"Select"}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-[8px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              Total Roomates
            </Typography>
          </div>
          <Select
            options={[]}
            register={register('dateAvailable')}
            placeholder={"Select"}
          />
          <div className="mb-[4px] mt-[30px]">
            <Typography variant="body" customClassName="text-[16px] font-bold text-g7">
              Furnishing
            </Typography>
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              Not furnished
            </Typography>
          </div>
          <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
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
          <div className="mt-[111px] fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
            <div className="w-full">
              <div className="mb-[13px]">
                <Button size="lg" type="submit" disabled={false}>
                  {filterTranslation.t('Next')}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

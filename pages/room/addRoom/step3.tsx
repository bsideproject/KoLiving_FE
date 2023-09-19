import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import {
  Stepper,
  Textarea,
  Typography,
  Button,
} from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Option } from '@/components/Select/Select';
import { GuDong } from '../addRoom';
import Rectangle from '@/public/icons/rectangle.svg';
import RectangleCamera from '@/public/icons/rectangleCamera.svg';

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
    // 여기

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
      <Stepper step={3} totalStep={3} />
      <div className="h-screen overflow-y-scroll">
        <div className="mt-[9px] mb-[20px]" key="filter">
          <Typography variant="header" fontStyle="semiBold">
            Introduce your room
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-6/7 sm:w-1/2 md:w-3/7 lg:w-1/4 xl:w-1/5">
          <div className="mb-[4px]">
            <Typography variant="body" customClassName="text-[16px] font-bold text-g7 mb-[12px]">
              Room Photos
            </Typography>
          </div>
          <div className="mb-[4px]">
            <Typography variant="body" customClassName="text-[12px] font-semibold text-g5 mb-[8px]">
              You can up load maximum 5 photos in total
            </Typography>
          </div>
          {/* 업로드 버튼으로 사용될 SVG */}
          <div className="relative w-[120px] h-[110px] mt-[8px]"> 
            <Rectangle className="z-0" />
            <RectangleCamera className="absolute z-10 top-[45px] left-[55px] transform -translate-x-1/2 -translate-y-1/2" />
            <span className="absolute z-10 top-[67px] left-[55px] transform -translate-x-1/2 -translate-y-1/2 text-g4 semibold text-[12px]">3/5</span>
          </div>

          <div className="mt-[30px]">
            <Typography variant="body" customClassName="text-[16px] font-bold text-g7 mb-[12px]">
              About the house
            </Typography>
          </div>
          <div>
            <Textarea placeholder={"Describe your house to others!"} register={register('describe')} maxByte={3000} />
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

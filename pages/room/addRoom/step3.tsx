import React, { useState, useRef } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import {
  Stepper,
  Textarea,
  Typography,
  Button,
  Upload
} from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Rectangle from '@/public/icons/rectangle.svg';
import RectangleCamera from '@/public/icons/rectangleCamera.svg';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['filter', 'common'])),
  },
});

export default function Step1() {
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const [showUpload, setShowUpload] = useState(false);
  const uploadRef = useRef(null);

  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // 여기
  };

  const handleCameraClick = () => {
    setShowUpload(true);
  }

  // callback
  // const handleFilesAdded = (newImages: File[]) => {
  //   // TODO: 여기서 새로 추가된 이미지를 처리하십시오.
  //   console.log(newImages);
  // }

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
          <Upload />

          <hr className="mt-[32px]"/>

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

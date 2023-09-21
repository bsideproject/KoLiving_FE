import React, { useState } from 'react';
import { ImageListType } from "react-images-uploading";
import ModalBox from '@/components/Modal/ModalBox.tsx';
import {
  Stepper,
  Textarea,
  Typography,
  Button,
  Upload
} from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Router, { useRouter } from 'next/router';


interface Step2Props {
  step1Data?: any;
  step2Data?: any;
}

/***
 * @see   룸등록 Step3
 */
export default function Step3({ step1Data, step2Data }: Step2Props) {
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const [imageList, setImageList] = useState<ImageListType>([]);
  const [showComplete, setShowComplete] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('step1 Data', step1Data);
    console.log('step2 Data', step2Data);
    console.log('step3 Data', data);

    setShowComplete(true);
    // roomPostComplete();
  };

  const callbackImageList = (_imageList: ImageListType) => {
    setImageList(_imageList);
  }
  const roomPostComplete = () => {
    Router.push('/');
  }

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
          <Upload 
            callbackImageFn={callbackImageList}
          />

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
                <Button size="lg" type="submit" disabled={(imageList || []).length <= 0 || !watch('describe')}>
                  Complete
                </Button>
              </div>
            </div>
          </div>
        </form>
        {
          showComplete&&
            <ModalBox
              title="Congratulation!"
              content="Your room is now added to the list!"
              buttonType="default"
              buttonName="Complete"
              overlayClose
              handleClose={roomPostComplete}
            />
        }
      </div>
    </>
  );
}

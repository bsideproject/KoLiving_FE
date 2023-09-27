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
import { useRouter } from 'next/router';
import { fetchPostRoom } from '@/api/room';


// TODO 요기 any 인거 나중에 타입에 맞게 바꿔줘야함...
interface Step2Props {
  step1Data?: any;
  step2Data?: any;
};

enum RoomNumber {
  ONE = "ONE",
  TWO = "TWO",
  THREE = "THREE",
  FOUR = "FOUR",
  FIVE = "FIVE",
  SIX = "SIX",
  SIX_OR_OVER = "SIX_OR_OVER",
  UNKNOWN_NUMBER = "UNKNOWN_NUMBER"
};

/***
 * @see   룸등록 Step3
 */
export default function Step3({ step1Data, step2Data }: Step2Props) {
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const [imageList, setImageList] = useState<ImageListType>([]);
  const [showComplete, setShowComplete] = useState(false);
  const router = useRouter();

  const numberToStringMapping: { [key: number]: string } = {
    1: "ONE",
    2: "TWO",
    3: "THREE",
    4: "FOUR",
    5: "FIVE",
    6: "SIX"
  };

  const numberToString = (num: number): string  =>{
    if (num >= 6) return "SIX_OR_OVER";
    return numberToStringMapping[num] || "UNKNOWN_NUMBER";
  }

  // TODO any 인거 나중에 바꿔주자
  const makeRoomPostParams = (step1Data: any, step2Data: any, imgageList: any, data: any) => {
    let result = {
      // step1
      locationId: 0 // TEST
      , monthlyRent: 0
      , availableDate: "2023-09-27"
      , deposit: 0
      , maintenanceFee: 0
      , gasIncluded: true
      , waterIncluded: true
      , electricityIncluded: true
      , cleaningIncluded: true
      , furnishingIds: [0]

      //step2
      , roomType: step2Data.roomType
      , bedrooms: RoomNumber.ONE
      , bathrooms: RoomNumber.ONE
      , roommates: RoomNumber.ONE
      
      // step3
      , description: watch('description')
      , imageIds: [0] // TEST
    };

    return result;
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('step1Data', step1Data);
    console.log('step2Data', step2Data);
    console.log('step3Data', data);
    console.log('imageList', imageList);

    const params = makeRoomPostParams(step1Data, step2Data, imageList, data);
    await fetchPostRoom(params);
    setShowComplete(true);
  };
  const callbackImageList = (_imageList: ImageListType) => {
    setImageList(_imageList);
  }
  const roomPostComplete =  () => {
    try {
      // 라우팅이 안되요,,,, const result = router.push('/');.......
      window.location.href= window.location.origin;
    } catch(error) {
      console.error('routingError', error);
    }
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
            InitImageComponent={null}
            multiImage={true}
          />

          <hr className="mt-[32px]"/>

          <div className="mt-[30px]">
            <Typography variant="body" customClassName="text-[16px] font-bold text-g7 mb-[12px]">
              About the house
            </Typography>
          </div>
          <div>
            <Textarea placeholder={"Describe your house to others!"} register={register('description')} maxByte={3000} />
          </div>
          <div className="mt-[111px] fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
            <div className="w-full">
              <div className="mb-[13px]">
                <Button size="lg" type="submit" disabled={(imageList || []).length <= 0 || !watch('description')}>
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

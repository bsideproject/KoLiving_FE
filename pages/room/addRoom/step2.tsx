import React, { useState } from 'react';
import { Stepper, Stepper2, Typography, Checkbox, Button } from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useModal from '@/hooks/useModal.ts';
import Step3 from '@/pages/room/addRoom/step3.tsx';

interface Step2Props {
  step1Data?: any;
}

export default function Step2({ step1Data }: Step2Props) {
  const { openModal } = useModal();
  const { register, handleSubmit, watch, setValue } = useForm({ mode: 'onChange' });

  const useButtonState = (initValue: string) => {
    const [value, setValue] = useState(initValue);
    const handleButtonClick = (newValue: string) => setValue(newValue);

    return [value, handleButtonClick] as const;
  };

  const selectedCheckboxes = watch([
    'bedChecked',
    'wardrobeChecked',
    'tvChecked',
    'airconditionerChecked',
    'heaterChecked',
    'washingMachineChecked',
    'refrigeratorChecked',
    'doorLookChecked',
  ]);

  const [typeButton, setTypeButton] = useButtonState('Studio');
  const [ynButton, setYnButton] = useButtonState('NO');
  const [bedroomCount, setBedroomCount] = useState(2);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [roommatesCount, setRoommatesCount] = useState(0);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const params = {
      ...data,
      roomType: typeButton,
      bedRooms: bedroomCount,
      bathrooms: bathroomCount,
      roommates: roommatesCount,
      furnishingIds: [0], // TEST
    };

    openModal({
      props: {
        title: 'Add room',
        size: 'full',
        custom: true,
        customHeader: true,
      },
      children: <Step3 step1Data={step1Data} step2Data={params} />,
    });
  };

  const buttons = [{ label: 'Studio' }, { label: '1bed flat' }, { label: 'Share house' }];

  const checkBoxes = [
    { label: 'Bed', name: 'bedChecked' },
    { label: 'Wardrobe', name: 'wardrobeChecked' },
    { label: 'TV', name: 'tvChecked' },
    { label: 'Air conditioner', name: 'airconditionerChecked' },
    { label: 'Heater', name: 'heaterChecked' },
    { label: 'Washing machine', name: 'washingMachineChecked' },
    { label: 'Refrigerator', name: 'refrigeratorChecked' },
    { label: 'Door lock', name: 'doorLookChecked' },
  ];

  const handleButtonClick = (label: string) => {
    setTypeButton(label);
  };

  /** 버튼 색상 관련, 클릭 시 색상 조정 */
  const getButtonColor = (label: string) => {
    return typeButton === label ? 'r1' : 'outlined';
  };
  const getYNButtonColor = (label: string) => {
    return ynButton === label ? 'r1' : 'outlined';
  };

  // YES, NO 버튼 클릭 시
  const handleYNButtonClick = (value: string) => {
    setYnButton(value);

    if (value === 'NO') {
      checkBoxes.forEach((item) => {
        setValue(item.name, false);
      });
    }
  };

  // + - 버튼 클릭 시 Count 값 콜백
  const handleCountUpdate = (callbackCountUpdate: Function, count: number) => {
    callbackCountUpdate(count);
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
              {buttons.map((button, index) => (
                <div key={button.label + index}>
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

          {/* 경계선~ */}
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
              <Stepper2
                register={register('bedRooms')}
                disabled={['Studio', '1bed flat'].indexOf(typeButton) > -1}
                initCount={typeButton === 'Studio' ? 0 : typeButton === 'Share house' ? 2 : 1}
                disabledLeft={typeButton === 'Share house' && bedroomCount <= 2}
                disabledRight={typeButton === 'Share house' && bedroomCount >= 20}
                callbackCount={(count) => handleCountUpdate(setBedroomCount, count)}
              />
            </div>
            <div className="flex justify-between items-center mb-[8px]">
              <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
                Total bathrooms
              </Typography>
              <Stepper2
                register={register('bathrooms')}
                initCount={1}
                disabledLeft={bathroomCount <= 1}
                disabledRight={bathroomCount >= 20}
                callbackCount={(count) => handleCountUpdate(setBathroomCount, count)}
              />
            </div>
            <div className="flex justify-between items-center mb-[8px]">
              <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
                Total roommates
              </Typography>
              <Stepper2
                register={register('roommates')}
                initCount={1}
                disabledLeft={roommatesCount <= 0}
                disabledRight={roommatesCount >= 20}
                callbackCount={(count) => handleCountUpdate(setRoommatesCount, count)}
              />
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
                <Button
                  size="lg"
                  type="button"
                  onClick={() => handleYNButtonClick('YES')}
                  color={getYNButtonColor('YES')}
                >
                  YES
                </Button>
              </div>
              <div className="col-span-1">
                <Button
                  size="lg"
                  type="button"
                  onClick={() => handleYNButtonClick('NO')}
                  color={getYNButtonColor('NO')}
                >
                  NO
                </Button>
              </div>
            </div>
          </div>
          <div className={`grid grid-cols-2 gap-[12px] mt-[16px] ${ynButton ? 'mb-[200px]' : 'mb-[166px]'}`}>
            {ynButton === 'YES' &&
              checkBoxes.map((item) => (
                <Checkbox
                  type="outlined"
                  label={item.label}
                  register={register(item.name)}
                  checked={watch(item.name)}
                />
              ))}
          </div>
          <div className=" fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
            <div className="w-full">
              <div className="mb-[13px]">
                <Button
                  size="lg"
                  type="submit"
                  disabled={ynButton === 'YES' && !Object.values(selectedCheckboxes).some((val) => val)}
                >
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

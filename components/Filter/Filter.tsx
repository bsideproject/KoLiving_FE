import React, { useState, useEffect, useCallback, use, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import { Toast, Chip, Select, Toggle, Checkbox, Button, Input } from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { GuList, DongList } from '@/public/js/guDongList.ts';
import toast from 'react-hot-toast';
import styles from './Filter.module.scss';
import { Option } from '../Select/Select';
import Calendar from '../Calendar/Calendar';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['filter', 'common'])),
  },
});

const TYPE_OF_HOUSING = [
  {
    value: 'studioChecked',
    label: 'Studio',
  },
  {
    value: 'bedFlatsChecked',
    label: '1bed Flats',
  },
  {
    value: 'shareHouseChecked',
    label: 'Share House',
  },
];

const FURNISHING = [
  {
    value: 'bedChecked',
    label: 'Bed',
  },
  {
    value: 'wardrobeChecked',
    label: 'Wardrobe',
  },
  {
    value: 'tvChecked',
    label: 'TV',
  },
  {
    value: 'airconditionerChecked',
    label: 'Airconditioner',
  },
  {
    value: 'heaterChecked',
    label: 'Heater',
  },
  {
    value: 'washingMachineChecked',
    label: 'Washing Machine',
  },
  {
    value: 'stoveChecked',
    label: 'Stove',
  },
  {
    value: 'refregeratorChecked',
    label: 'Refregerator',
  },
  {
    value: 'doorLockChecked',
    label: 'Door Lock',
  },
];

interface GuDong {
  gu: Option;
  dong: Option;
}

export default function Filter({
  getChildData,
  closeModal,
  roomsLength,
}: {
  getChildData: (data: any) => void;
  closeModal: () => void;
  roomsLength: number;
}) {
  const { register, handleSubmit, watch, reset } = useForm({ mode: 'onChange' });
  const [selectedLocations, setSelectedLocations] = useState<GuDong[]>([]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    getChildData(data);
    closeModal();
  };

  // 옵션 제거 시 실행될 함수
  const removeLocation = (option: string | number) => {
    setSelectedLocations((prevSelectedLocations) =>
      prevSelectedLocations.filter((item) => {
        const value = String(option);

        return item.dong.value !== value;
      })
    );
  };

  const toggleMonthRent = watch('monthToggle');
  const toggleDeposit = watch('depositToggle');
  const dateAvailableToggle = watch('dateAvailableToggle');
  const gu = watch('gu');
  const dong = watch('dong');

  const filteredDongList = useMemo(() => {
    if (!gu) {
      return [];
    }

    return DongList.filter((v) => v.gu === gu.value);
  }, [gu]);

  const resetFilter = useCallback(() => {
    reset();
    // 다시 api 요청
  }, [reset]);

  useEffect(() => {
    if (!dong) return;

    if (selectedLocations.length === 5) {
      toast.error('You can select up to five');
      return;
    }

    const isExist = selectedLocations.some((item) => item.dong.value === dong.value);

    if (isExist) {
      toast.error('Already selected');
      return;
    }

    setSelectedLocations((prevSelectedLocations) => {
      prevSelectedLocations.push({
        gu: {
          ...gu,
        },
        dong: {
          ...dong,
        },
      });

      return [...prevSelectedLocations];
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dong]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-screen overflow-y-scroll font-pretendard">
        {/* Location */}
        <div className="mt-[20px] mb-[32px]">
          <div className="mb-[12px]">
            <div className={styles['sub-header']}>Location</div>
          </div>
          <div className="grid grid-flow-row gap-[8px]">
            <Select options={GuList} register={register('gu')} placeholder="Gu" />
            <Select options={filteredDongList} register={register('dong')} placeholder="Dong" disabled={!watch('gu')} />
          </div>

          {/* 선택된 옵션들에 대해 동적으로 Chip 컴포넌트 렌더링 */}
          {selectedLocations.length > 0 && (
            <div className="mt-[16px] overflow-x-auto whitespace-nowrap">
              {selectedLocations.map((option) => {
                return (
                  <Chip
                    key={option.dong.value}
                    label={`${option.gu.label}, ${option.dong.label}`}
                    onDelete={() => removeLocation?.(option.dong.value)}
                    clicked
                  />
                );
              })}
            </div>
          )}
        </div>

        <hr />

        {/* Deposit */}
        <div className="mt-[32px] mb-[28px]">
          <div className="mb-[4px]">
            <div className={styles['sub-header']}>Deposit</div>
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <div className="text-g5 font-normal">View rooms without deposit</div>
            <Toggle className="ml-2" register={register('depositToggle')} />
          </div>
          {!toggleDeposit && (
            <>
              <div className="mb-[8px]">
                <div className="text-g5 text-[12px] font-normal">Min 0 ￦ - Max 500,000,000 ￦</div>
              </div>
              <div className="grid grid-flow-row gap-[8px]">
                <Input placeholder="Min" type="number" register={register('depositMin')} />
                <Input placeholder="Max" type="number" register={register('depositMax')} />
              </div>
            </>
          )}
        </div>

        {/* Month rent */}
        <div className="mb-[32px]">
          <div className="mb-[4px]">
            <div className={styles['sub-header']}>Month rent</div>
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <div className="text-g5 font-normal">Include maintenance fee</div>
            <Toggle className="ml-2" register={register('monthToggle')} />
          </div>
          {!toggleMonthRent && (
            <>
              <div className="mb-[8px]">
                <div className="text-g5 text-[12px] font-normal">Min 0 ￦ - Max 20,000,000 ￦ </div>
              </div>
              <div className="grid grid-flow-row gap-[8px]">
                <Input placeholder="Min" type="number" register={register('monthMin')} />
                <Input placeholder="Max" type="number" register={register('monthMax')} />
              </div>
            </>
          )}
        </div>

        <hr />

        {/* Date available */}
        <div className="my-[40px]">
          <div className="mb-[4px]">
            <div className={styles['sub-header']}>Date available</div>
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <div className="text-g5 font-normal">View rooms available now</div>
            <Toggle className="ml-2" register={register('dateAvailableToggle')} />
          </div>
          {!dateAvailableToggle && (
            <div className="mb-[16px]">
              <Calendar placeholder="MM-DD-YYYY" type="text" register={register('dateAvailable')} />
            </div>
          )}
        </div>

        <hr />

        {/* Type of housing */}
        <div className="my-[32px]">
          <div className="mb-[4px]">
            <div className={styles['sub-header']}>Type of housing</div>
          </div>
          <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
            {TYPE_OF_HOUSING.map((item) => {
              return (
                <Checkbox
                  type="outlined"
                  label={item.label}
                  register={register(item.value)}
                  checked={watch(item.value)}
                  key={item.value}
                />
              );
            })}
          </div>
        </div>

        <hr />

        <div className="mt-[32px] mb-[4px]">
          <div className={styles['sub-header']}>Furnishing</div>
        </div>
        <div className="grid grid-cols-2 gap-[8px] mt-[12px] mb-[166px]">
          {FURNISHING.map((item) => {
            return (
              <Checkbox
                type="outlined"
                label={item.label}
                register={register(item.value)}
                checked={watch(item.value)}
                key={item.value}
              />
            );
          })}
        </div>
        <div className="mt-[83px] fixed bottom-[0px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
          <div className="w-full">
            <div className="mb-[13px] space-x-[8px] max-w-max flex">
              <div className="w-[30%]">
                <Button type="reset" size="lg" color="noBg" onClick={resetFilter}>
                  Reset
                </Button>
              </div>
              <div className="w-[70%]">
                <Button type="submit" size="lg">
                  Apply {`(${roomsLength} Rooms)`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

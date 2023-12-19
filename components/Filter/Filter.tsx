import React, { useState, useEffect, useCallback, use, useMemo } from 'react';
import { Chip, Select, Toggle, Checkbox, Button, Input } from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { GuList, DongList } from '@/public/js/guDongList.ts';
import toast from 'react-hot-toast';
import { fetchFurnishings, getRooms } from '@/api/room';
import { ROOM_TYPE, ROOM_TYPE_KEYS, ROOM_TYPE_LABEL } from '@/public/types/room';
import { formatDateForAPI } from '@/utils/transform';
import { isEmpty } from 'lodash-es';
import styles from './Filter.module.scss';
import { Option } from '../Select/Select';
import Calendar from '../Calendar/Calendar';

const ROOM_TYPE_OPTIONS = Object.entries(ROOM_TYPE).map(([label, value]) => ({
  label: ROOM_TYPE_LABEL[label as ROOM_TYPE_KEYS],
  value,
}));

interface GuDong {
  gu: Option;
  dong: Option;
}

export default function Filter({
  getChildData,
  closeModal,
  focus,
  initialData,
}: {
  getChildData: (data: any) => void;
  closeModal: () => void;
  focus?: number;
  initialData?: any;
}) {
  const { register, handleSubmit, watch, reset, setValue } = useForm({ mode: 'onChange', shouldUnregister: false });
  const [selectedLocations, setSelectedLocations] = useState<GuDong[]>([]);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useState({});

  const onSubmit: SubmitHandler<FieldValues> = () => {
    getChildData(searchParams);
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

  const [furnishings, setFurnishings] = useState<Option[] | null>([]);

  const getFurnishings = async () => {
    try {
      const data = await fetchFurnishings();

      if (!data) {
        return;
      }

      const mappedFurnishing = data.map((item) => {
        return {
          value: item.id,
          label: item.desc,
        };
      });

      setFurnishings(mappedFurnishing);
    } catch (error) {
      console.error(error);
    }
  };

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

  const [housingChecked, setHousingChecked] = useState<string[]>([]);
  const handleHousingCheck = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setHousingChecked((prev) => [...prev, value]);
    } else {
      setHousingChecked((prev) => prev.filter((item) => item !== value));
    }
  };

  const [furnishingChecked, setFurnishingChecked] = useState<(string | number)[]>([]);
  const handleFurnishingCheck = (value: string | number, isChecked: boolean) => {
    if (isChecked) {
      setFurnishingChecked((prev) => [...prev, value]);
    } else {
      setFurnishingChecked((prev) => prev.filter((item) => item !== value));
    }
  };

  const minDeposit = watch('depositMin');
  const maxDeposit = watch('depositMax');
  const minMonthlyRent = watch('monthMin');
  const maxMonthlyRent = watch('monthMax');
  const dateAvailable = watch('dateAvailable');

  useEffect(() => {
    if (minMonthlyRent > 20000000) {
      setValue('monthMin', 20000000);
    }
    if (maxMonthlyRent > 20000000) {
      setValue('monthMax', 20000000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minMonthlyRent, maxMonthlyRent, setValue]);

  useEffect(() => {
    if (minDeposit > 500000000) {
      setValue('depositMin', 500000000);
    }
    if (maxDeposit > 500000000) {
      setValue('depositMax', 500000000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minDeposit, maxDeposit, setValue]);

  useEffect(() => {
    const formattedSelectedLocation = selectedLocations.map((item) => item.dong.value);

    if (minDeposit === undefined) {
      return;
    }

    const fetchData = async () => {
      setSearchParams({
        locationIds: formattedSelectedLocation.join(', '),
        locations: selectedLocations,
        minDeposit,
        maxDeposit,
        minMonthlyRent,
        maxMonthlyRent,
        types: housingChecked.join(', '),
        housingChecked,
        furnishingChecked,
        furnishingTypes: furnishingChecked.join(', '),
        ...(dateAvailable ? { availableDate: formatDateForAPI(dateAvailable) } : {}),
      });
      const data = await getRooms({
        locationIds: formattedSelectedLocation.join(', '),
        minDeposit,
        maxDeposit,
        minMonthlyRent,
        maxMonthlyRent,
        types: housingChecked.join(', '),
        furnishingTypes: furnishingChecked.join(', '),
        ...(dateAvailable ? { availableDate: formatDateForAPI(dateAvailable) } : {}),
      });
      if (data) {
        setCount(data.totalElements);
      }
    };

    fetchData();
  }, [
    selectedLocations,
    minDeposit,
    maxDeposit,
    minMonthlyRent,
    maxMonthlyRent,
    dateAvailable,
    housingChecked,
    furnishingChecked,
  ]);

  const resetSearchParams = () => {
    if (!isEmpty(initialData)) {
      setSelectedLocations(initialData.locations);
      setValue('depositMin', initialData.minDeposit);
      setValue('depositMax', initialData.maxDeposit);
      setValue('monthMin', initialData.minMonthlyRent);
      setValue('monthMax', initialData.maxMonthlyRent);
      setValue('dateAvailable', initialData.availableDate);
      initialData.housingChecked.forEach((item: string) => {
        setValue(`${item}`, true);
        setHousingChecked((prev) => [...prev, item]);
      });
      initialData.furnishingChecked.forEach((item: string) => {
        setValue(`${item}`, true);
        setFurnishingChecked((prev) => [...prev, item]);
      });
    }
  };

  useEffect(() => {
    resetSearchParams();
    getFurnishings();
  }, []);

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
            <div className="font-normal text-g5">View rooms without deposit</div>
            <Toggle className="ml-2" register={register('depositToggle')} />
          </div>
          {!toggleDeposit && (
            <>
              <div className="mb-[8px]">
                <div className="text-g5 text-[12px] font-normal">Min 0 ￦ - Max 500,000,000 ￦</div>
              </div>
              <div className="grid grid-flow-row gap-[8px]">
                <Input
                  placeholder="Min"
                  type="tel"
                  register={register('depositMin')}
                  maxLength={9}
                  fixedWord={watch('depositMin')}
                />
                <Input
                  placeholder="Max"
                  type="tel"
                  register={register('depositMax')}
                  maxLength={9}
                  fixedWord={watch('depositMax')}
                />
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
            <div className="font-normal text-g5">Include maintenance fee</div>
            <Toggle className="ml-2" register={register('monthToggle')} />
          </div>
          {!toggleMonthRent && (
            <>
              <div className="mb-[8px]">
                <div className="text-g5 text-[12px] font-normal">Min 0 ￦ - Max 20,000,000 ￦ </div>
              </div>
              <div className="grid grid-flow-row gap-[8px]">
                <Input
                  placeholder="Min"
                  type="tel"
                  register={register('monthMin')}
                  maxLength={8}
                  fixedWord={watch('monthMin')}
                />
                <Input
                  placeholder="Max"
                  type="tel"
                  register={register('monthMax')}
                  maxLength={8}
                  fixedWord={watch('monthMax')}
                />
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
            <div className="font-normal text-g5">View rooms available now</div>
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
            {ROOM_TYPE_OPTIONS.map((item) => {
              return (
                <Checkbox
                  type="outlined"
                  label={item.label}
                  register={register(item.value)}
                  checked={watch(item.value)}
                  onChange={(e) => handleHousingCheck(item.value, e)}
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
          {furnishings &&
            furnishings.map((item) => {
              return (
                <Checkbox
                  type="outlined"
                  label={item.label}
                  register={register(`${item.value}`)}
                  checked={watch(`${item.value}`)}
                  onChange={(e) => handleFurnishingCheck(item.value, e)}
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
                  Apply {`(${count} Rooms)`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

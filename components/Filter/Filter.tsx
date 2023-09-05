import React, { useState, useEffect, useCallback, use } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import { Toast, Chip, Select, Toggle, Checkbox, Button, Input } from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { GuList, DongList } from '@/public/js/guDongList.ts';
import styles from './Filter.module.scss';

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

export default function Filter({
  getChildData,
  closeModal,
  roomsLength,
}: {
  getChildData: (data: any) => void;
  closeModal: () => void;
  roomsLength: number;
}) {
  const filterTranslation = useTranslation('filter');
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const [guValue, setGuValue] = useState<{ value: string; label: string }>({
    value: '',
    label: '',
  });
  // const modalSetter = React.useContext(ModalSetterContext);
  const [dongValue, setDongValue] = useState<{ gu: string; guLabel: string; value: string; label: string }>({
    gu: '',
    guLabel: '',
    value: '',
    label: '',
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [showMessage, setMessage] = useState<string>('');
  const filteredDongList = DongList.filter((v) => v.gu === guValue.value);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    getChildData(data);
    closeModal();
  };

  const handleToastVisibleChange = (visible: boolean) => {
    setShowToast(visible);
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
        setShowToast(true);
        // TODO translation 사용해서 여기 나중에 바꿔줘야함
        setMessage('You can select up to five');
        return [...prevSelectedOptions];
      }

      if (!isExist) {
        resultOptions = [...prevSelectedOptions, guValue?.label.concat(`, ${option}`)];
      } else {
        setShowToast(true);
        // TODO translation 사용해서 여기 나중에 바꿔줘야함
        setMessage('Already selected');
        resultOptions = prevSelectedOptions;
      }
      return [...resultOptions];
    });
  }, [dongValue.label, guValue?.label]);
  /** Dong Select Component 변경될 경우 -> 일반 선언형 함수로 정의할 경우 Rendering 마다 새로운 인스턴스가 생성됨 */
  const handleDongChange = useCallback(
    (selectedValue: string, selectedLabel: string) => {
      // 선택된 value와 label 값을 이용하여 원하는 작업 수행
      setDongValue({ value: selectedValue, label: selectedLabel, gu: guValue.value, guLabel: guValue.label });
    },
    [guValue.label, guValue.value]
  );
  /** Dong Select Component 변경될 경우 -> 일반 선언형 함수로 정의할 경우 Rendering 마다 새로운 인스턴스가 생성됨 */
  const handleGuChange = useCallback((selectedValue: string, selectedLabel: string) => {
    // 선택된 value와 label 값을 이용하여 원하는 작업 수행
    setGuValue({ value: selectedValue, label: selectedLabel });
  }, []);
  // 옵션 제거 시 실행될 함수
  const handleOptionRemove = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((item) => item !== option));
  };
  useEffect(() => {
    handleOptionSelect();
  }, [dongValue.label, handleOptionSelect]);

  const toggleMonthRent = watch('monthToggle');
  const toggleDeposit = watch('depositToggle');
  const dateAvailableToggle = watch('dateAvailableToggle');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-6/7 sm:w-1/2 md:w-3/7 lg:w-1/4 xl:w-1/5">
      <div className="h-screen overflow-y-scroll font-pretendard">
        {/* Location */}
        <div className="mt-[20px] mb-[32px]">
          <div className="mb-[12px]">
            <div className={styles['sub-header']}>Location</div>
          </div>
          <div className="grid grid-flow-row gap-[8px]">
            <Select options={GuList} register={register('gu')} placeholder="Gu" onChange={handleGuChange} />
            <Select
              options={filteredDongList}
              register={register('dong')}
              placeholder="Dong"
              disabled={!watch('gu')}
              onChange={handleDongChange}
            />
          </div>

          {/* 선택된 옵션들에 대해 동적으로 Chip 컴포넌트 렌더링 */}
          <div className="mt-[16px] overflow-x-auto whitespace-nowrap">
            {selectedOptions.map((option) => {
              return <Chip key={option} label={option} onDelete={() => handleOptionRemove?.(option)} clicked />;
            })}
          </div>
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
              <Input placeholder="MM-DD-YYYY" type="text" register={register('mmddyyyy')} />
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
        <div className="grid grid-cols-2 gap-[8px] mt-[12px] mb-[166px] ">
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
                <Button type="reset" size="lg" color="noBg">
                  Reset
                </Button>
              </div>
              <div className="w-[70%]">
                <Button type="submit" size="lg">
                  {/* TODO : 조회된 Room 개수로 변경 필요  */}
                  Apply {`(${roomsLength} Rooms)`}
                </Button>
              </div>
            </div>
          </div>
        </div>
        {showToast && <Toast message={showMessage} duration={3000} onVisibleChange={handleToastVisibleChange} />}
      </div>
    </form>
  );
}

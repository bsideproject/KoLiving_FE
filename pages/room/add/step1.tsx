import React, { useState, useEffect, useCallback, use, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import useModal from '@/hooks/useModal.ts';
import { Stepper, Chip, Select, Typography, Checkbox, Button, Input, Calendar } from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { GuList, DongList } from '@/public/js/guDongList.ts';
import { Option } from '@/components/Select/Select';
import Step2 from '@/pages/room/addRoom/step2.tsx';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import toast from 'react-hot-toast';
import MultiButton from '@/components/MultiButton/MultiButton';
import styles from './add.module.scss';

interface GuDong2 extends Option {
  gu: string | number;
  guLabel: string;
}

interface GuDong {
  gu: Option;
  dong: Option;
}

const MAINTANANCE_FEE_OPTIONS = [
  {
    value: 'yes',
    label: 'YES',
  },
  {
    value: 'no',
    label: 'NO',
  },
];

const INCLUDE_OPTIONS = [
  {
    value: 'gasChecked',
    label: 'Gas',
  },
  {
    value: 'waterChecked',
    label: 'Water',
  },
  {
    value: 'electricityChecked',
    label: 'Electricity',
  },
  {
    value: 'cleaningChecked',
    label: 'Cleaning',
  },
];

export default function AddRoom() {
  const { openModal } = useModal();
  const filterTranslation = useTranslation('filter');
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const [buttonState, setButtonState] = useState('YES');
  const [isCalendarShow, setCalendarShow] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState<GuDong[]>([]);

  const [guValue, setGuValue] = useState<Option>({
    value: '',
    label: '',
  });

  const [dongValue, setDongValue] = useState<GuDong2>({
    gu: '',
    guLabel: '',
    value: '',
    label: '',
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  // const filteredDongList = DongList.filter((v) => v.gu === guValue?.value || '');
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    openModal({
      props: {
        title: 'Add room',
        size: 'full',
        custom: true,
        customHeader: true,
      },
      children: <Step2 step1Data={data} />,
    });
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
        resultOptions = prevSelectedOptions;
      }
      return [...resultOptions];
    });
  }, [dongValue.label, guValue?.label]);

  const handleDongChange = useCallback(
    (option: Option) => {
      // 선택된 value와 label 값을 이용하여 원하는 작업 수행
      setDongValue({ ...option, gu: guValue.value, guLabel: guValue.label });
    },
    [guValue?.label, guValue?.value]
  );

  const handleGuChange = useCallback((option: Option) => {
    setGuValue(option);
  }, []);

  const handleOptionRemove = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((item) => item !== option));
  };
  const handleCalendarShow = (isShow: boolean) => {
    setCalendarShow(isShow);
  };

  const isNextStep = () => {
    return (
      !watch('dong') ||
      !watch('monthPrice') ||
      !(watch('depositPrice') || watch('depositChecked')) ||
      !(watch('availableChecked') || watch('dateAvailable')) ||
      !((buttonState === 'YES' && watch('maintananceFee')) || buttonState === 'NO')
    );
  };

  const handleButtonClick = (value: string) => {
    setButtonState(value);
  };

  const getButtonColor = (value: string) => {
    return buttonState === value ? 'r1' : 'outlined';
  };

  useEffect(() => {
    handleOptionSelect();
  }, [dongValue.label, handleOptionSelect]);

  const gu = watch('gu');
  const dong = watch('dong');
  const filteredDongList = useMemo(() => {
    if (!gu) {
      return [];
    }

    return DongList.filter((v) => v.gu === gu.value);
  }, [gu]);

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

  // 옵션 제거 시 실행될 함수
  const removeLocation = (option: string | number) => {
    setSelectedLocations((prevSelectedLocations) =>
      prevSelectedLocations.filter((item) => {
        const value = String(option);

        return item.dong.value !== value;
      })
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stepper step={1} totalStep={3} />
      <div className="mt-[9px] mb-[20px]">
        <Typography variant="header" fontStyle="semiBold">
          Fill in the basic informations
        </Typography>
      </div>
      <div className="mb-[32px]">
        <div className="mb-[4px]">
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

      {/* 구분선 */}
      <hr />

      {/* Monthly rent */}
      <div className="my-[32px]">
        <div className="mb-[16px]">
          <div className={styles['sub-header']}>Monthly rent</div>
        </div>
        <div className="mb-[8px]">
          <div className="text-g5 text-[12px] font-normal">Min 0 ￦ - Max 500,000,000 ￦</div>
        </div>
        <div className="mb-[28px]">
          <Input placeholder="Price" type="number" register={register('monthPrice')} />
        </div>
      </div>

      {/* Deposit */}
      <div className="mb-[28px]">
        <div className="mb-[10px]">
          <div className={styles['sub-header']}>Deposit</div>
        </div>
        <div className="mb-[8px]">
          <div className="text-g5 text-[12px] font-normal">Min 0 ￦ - Max 500,000,000 ￦</div>
        </div>
        <div className="mb-[16px]">
          <Input
            placeholder="Price"
            type="number"
            register={register('depositPrice')}
            disabled={watch('depositChecked')}
          />
        </div>
        <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
          <Checkbox type="outlined" label="No Deposit" register={register('depositChecked')} />
        </div>
      </div>

      {/* Maintanance fee */}
      <div>
        <div className="mb-[4px] mt-[28px]">
          <div className="mb-[10px]">
            <div className={styles['sub-header']}> Maintanance fee</div>
          </div>
        </div>
        <div className="mb-[24px]">
          <MultiButton options={MAINTANANCE_FEE_OPTIONS} register={register('maintananceFee')} />
        </div>
        {watch('maintananceFee')?.value === 'yes' && (
          <div className="mb-[16px]">
            <Input
              placeholder={filterTranslation.t('Price') as string}
              type="number"
              register={register('maintananceFee')}
            />
          </div>
        )}

        {/* Maintanance fee - Included */}
        <div className="mb-[16px]">
          <div className="text-g5 text-[12px] font-normal">Included (optional)</div>
        </div>
        <div className="grid grid-cols-2 gap-[8px] mt-[12px] mb-[40px]">
          {INCLUDE_OPTIONS.map((item) => {
            return (
              <Checkbox
                key={item.value}
                type="outlined"
                label={item.label}
                register={register(item.value)}
                checked={watch(item.value)}
              />
            );
          })}
        </div>
      </div>

      <hr />

      <div className="mb-[4px] mt-[28px]">
        <div className="mb-[10px]">
          <div className={styles['sub-header']}>Date available</div>
        </div>
      </div>
      <section className="mb-[8px]">
        <Calendar
          placeholder="MM-DD-YYYY"
          type="text"
          register={register('dateAvailable')}
          disabled={watch('availableChecked')}
        />
      </section>
      <div className={`grid grid-cols-2 gap-[8px] ${isCalendarShow ? 'mb-[533px]' : 'mb-[166px]'} `}>
        <Checkbox type="outlined" label="Available now" register={register('availableChecked')} />
      </div>
      <div className="fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
        <div className="w-full">
          <div className="mb-[13px]">
            <Button
              size="lg"
              type="submit"
              disabled={isNextStep()}
              onClick={() => {
                watch('dateAvailable');
              }}
            >
              {filterTranslation.t('Next')}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

AddRoom.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DefaultLayout title="Add Rooms" handleButtonClick={() => window.history.back()}>
      <div className="pt-[31px]">{page}</div>
    </DefaultLayout>
  );
};

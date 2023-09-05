import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import {
  Stepper,
  Toast,
  Chip,
  Select,
  Typography,
  Toggle,
  Checkbox,
  Space,
  Button,
  Input,
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
  const [showToast, setShowToast] = useState(false);
  const [showMessage, setMessage] = useState<string>('');
  const filteredDongList = DongList.filter((v) => v.gu === guValue.value);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // durl
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
    (option: Option) => {
      // 선택된 value와 label 값을 이용하여 원하는 작업 수행
      setDongValue({ ...option, gu: guValue.value, guLabel: guValue.label });
    },
    [guValue.label, guValue.value]
  );
  /** Dong Select Component 변경될 경우 -> 일반 선언형 함수로 정의할 경우 Rendering 마다 새로운 인스턴스가 생성됨 */
  const handleGuChange = useCallback((option: Option) => {
    // 선택된 value와 label 값을 이용하여 원하는 작업 수행
    setGuValue(option);
  }, []);
  // 옵션 제거 시 실행될 함수
  const handleOptionRemove = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((item) => item !== option));
  };
  useEffect(() => {
    handleOptionSelect();
  }, [dongValue.label, handleOptionSelect]);
  return (
    <>
      <Stepper step={1} totalStep={3} />
      <div className="h-screen overflow-y-scroll">
        <div className="mt-[9px] mb-[20px]" key="filter">
          <Typography variant="header" fontStyle="semiBold">
            Fill in the basic informations
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-6/7 sm:w-1/2 md:w-3/7 lg:w-1/4 xl:w-1/5">
          <div className="mb-[4px]">
            <Typography variant="body" customClassName="text-[16px] font-bold text-g7">
              Location
            </Typography>
          </div>
          <section>
            <Select
              options={GuList}
              register={register('gu', {
                validate: () => {
                  setGuValue(watch('gu'));
                  return true;
                },
              })}
              placeholder={filterTranslation.t('gu') as string}
              onChange={handleGuChange}
            />
          </section>
          <section>
            <Select
              options={filteredDongList}
              register={register('dong', {
                validate: () => {
                  return true;
                },
              })}
              placeholder={filterTranslation.t('dong') as string}
              disabled={!watch('gu')}
              onChange={handleDongChange}
            />
          </section>
          <div>
            {/* 선택된 옵션들에 대해 동적으로 Chip 컴포넌트 렌더링 */}
            {selectedOptions.map((option) => {
              return <Chip key={option} label={option} onDelete={() => handleOptionRemove?.(option)} clicked />;
            })}
          </div>
          <div className="py-[28px]">
            <div className="mb-[4px] mt-[36px]">
              <Typography variant="body" customClassName="text-[16px] font-bold text-g7">
                {filterTranslation.t('monthlyRent')}
              </Typography>
            </div>
            <div className="flex justify-between items-center mb-[20px]">
              <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
                Min 0 ￦ - Max 20,000,000 ￦
              </Typography>
            </div>
            <div className="mb-[8px]">
              <Input
                placeholder="Price"
                type="number"
                register={register('monthMin', {
                  validate: () => {
                    return true;
                    // return !!watch('monthToggle') && isRequired(value, '필수 항목');
                  },
                })}
              />
            </div>
          </div>
          <div className="mb-[4px]">
            <Typography variant="body" customClassName="text-[16px] font-bold text-g7">
              Deposit
            </Typography>
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              Min 0 ￦ - Max 50,000,000 ￦
            </Typography>
          </div>
          <div className="mb-[16px]">
            <Input
              placeholder={filterTranslation.t('Price') as string}
              type="text"
              register={register('price', {
                validate: () => {
                  return true;
                  // return !!watch('dateAvailable') && isRequired(value, '필수 항목');
                },
              })}
              disabled={!watch('dateAvailable')}
              // error={errors.mmddyyyy as FieldError}
            />
          </div>
          <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
            <Checkbox
              type="outlined"
              label={filterTranslation.t('No Deposit') as string}
              register={register('studioChecked')}
              checked={watch('studioChecked')}
            />
          </div>
          <div className="mb-[4px] mt-[28px]">
            <Typography variant="body" customClassName="text-[16px] font-bold text-g7">
              Maintanance fee
            </Typography>
          </div>
          <div className="mb-[13px]">
            <div className="mb-3 grid grid-cols-2 gap-0">
              <div className="col-span-1">
                <Button size="lg" type="submit" disabled={false}>
                  {filterTranslation.t('YES')}
                </Button>
              </div>
              <div className="col-span-1">
                <Button size="lg" type="submit" color="noBg" disabled={false}>
                  {filterTranslation.t('NO')}
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-[16px] mb-[16px]">
            <Input
              placeholder={filterTranslation.t('Price') as string}
              type="text"
              register={register('price', {
                validate: () => {
                  return true;
                  // return !!watch('dateAvailable') && isRequired(value, '필수 항목');
                },
              })}
              disabled={!watch('dateAvailable')}
            />
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <Typography variant="body" fontStyle="semiBold" customClassName="text-[16px]">
              Included (optional)
            </Typography>
          </div>
          <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
            <Checkbox
              type="outlined"
              label={filterTranslation.t('Gas') as string}
              register={register('gasChecked')}
              checked={watch('gasChecked')}
            />
            <Checkbox
              type="outlined"
              label={filterTranslation.t('Water') as string}
              register={register('waterChecked')}
              checked={watch('waterChecked')}
            />
            <Checkbox
              type="outlined"
              label={filterTranslation.t('Electricity') as string}
              register={register('electricityChecked')}
              checked={watch('electricityChecked')}
            />
            <Checkbox
              type="outlined"
              label={filterTranslation.t('Cleaning') as string}
              register={register('cleaningChecked')}
              checked={watch('cleaningChecked')}
            />
          </div>

          <div className="mb-[4px] mt-[28px]">
            <Typography variant="body" customClassName="text-[16px] font-bold text-g7">
              Date available
            </Typography>
          </div>
          <section>
            <Select
              options={[]}
              register={register('dateAvailable', {
                // validate: () => {
                //   setGuValue(watch('dateAvailable'));
                //   return true;
                // },
              })}
              placeholder={filterTranslation.t('MM-DD-YYYY') as string}
            />
          </section>
          <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
            <Checkbox
              type="outlined"
              label={filterTranslation.t('Available now') as string}
              register={register('studioChecked')}
              checked={watch('studioChecked')}
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

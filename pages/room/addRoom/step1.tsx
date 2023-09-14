import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import Router, { useRouter } from 'next/router';
import {
  Stepper,
  Chip,
  Select,
  Typography,
  Checkbox,
  Button,
  Input,
} from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { GuList, DongList } from '@/public/js/guDongList.ts';
import { Option } from '@/components/Select/Select';
import { GuDong } from '../addRoom';
import Calendar from '@/components/Calendar/Calendar.tsx';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['filter', 'common'])),
  },
});

export default function Step1() {
  const filterTranslation = useTranslation('filter');
  const { register, handleSubmit, watch, setValue } = useForm({ mode: 'onChange' });
  const [buttonState, setButtonState] = useState('YES');
  const [isCalendarShow, setCalendarShow] = useState(false);
  
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
  const filteredDongList = DongList.filter((v) => v.gu === guValue?.value || '');
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    Router.push(
      {
      pathname: '/room/addRoom/step2',
      query: { ...data },
    },
    '/room/addRoom/step2'
    )
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
  /** Dong Select Component 변경될 경우 -> 일반 선언형 함수로 정의할 경우 Rendering 마다 새로운 인스턴스가 생성됨 */
  const handleDongChange = useCallback(
    (option: Option) => {
      // 선택된 value와 label 값을 이용하여 원하는 작업 수행
      setDongValue({ ...option, gu: guValue.value, guLabel: guValue.label });
    },
    [guValue?.label, guValue?.value]
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
  const handleCalendarShow = (isShow: boolean) => {
    setCalendarShow(isShow);
  }

  const isNextStep = () => {
    return !watch('dong') || !watch('monthPrice') || !(watch('depositPrice') || watch('depositChecked')) || !(watch('availableChecked') || watch('dateAvailable')) || !(buttonState === 'YES' && watch('maintananceFee') || buttonState === 'NO');
  }

  const handleButtonClick = (value: string) => {
    setButtonState(value);
  };

  const getButtonColor = (value: string) => {
    return buttonState === value ? 'r1' : 'outlined';
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
          <section className="mb-[8px]">
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
          <div className={'mb-[32px]'}>
            {/* 선택된 옵션들에 대해 동적으로 Chip 컴포넌트 렌더링 */}
            {selectedOptions.map((option) => {
              return <Chip key={option} label={option} onDelete={() => handleOptionRemove?.(option)} clicked />;
            })}
          </div>

          {/* 구분선 */}
          <hr />

          <div className="py-[28px]">
            <div className="mt-[32px] mb-[16px]">
              <Typography variant="body" customClassName="text-[16px] font-bold text-g7">
                Monthly rent
              </Typography>
            </div>
            <div className="flex justify-between items-center mb-[8px]">
              <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
                Min 0 ￦ - Max 20,000,000 ￦
              </Typography>
            </div>
            <div className="mb-[8px]">
              <Input
                placeholder="Price"
                type="number"
                register={register('monthPrice', {
                  validate: () => {
                    return true;
                  },
                })}
              />
            </div>
          </div>
          <div className="mb-[10px]">
            <Typography variant="body" customClassName="text-[16px] font-bold text-g7">
              Deposit
            </Typography>
          </div>
          <div className="flex justify-between items-center mb-[8px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              Min 0 ￦ - Max 50,000,000 ￦
            </Typography>
          </div>
          <div className={`mb-[16px]`}>
            <Input
              placeholder={"Price"}
              type="text"
              register={register('depositPrice')}
              disabled={watch('depositChecked')}
            />
          </div>
          <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
            <Checkbox
              type="outlined"
              label={"No Deposit"}
              register={register('depositChecked')}
              checked={watch('depositChecked')}
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
                <Button size="lg" type="button" onClick={() => handleButtonClick('YES')} color={getButtonColor('YES')} >
                  YES
                </Button>
              </div>
              <div className="col-span-1">
                <Button size="lg" type="button" onClick={() => handleButtonClick('NO')} color={getButtonColor('NO')} >
                  NO
                </Button>
              </div>
            </div>
          </div>
          {
            (buttonState === 'YES') &&
            <div className="mt-[16px] mb-[16px]">
              <Input
                placeholder={filterTranslation.t('Price') as string}
                type="text"
                register={register('maintananceFee', {
                  validate: () => {
                    return true;
                  },
                })}
              />
            </div>
          }
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
          <section className='mb-[8px]'>
            <Calendar placeholder="MM-DD-YYYY" type="text" register={register('dateAvailable')} disabled={watch('availableChecked')} handleCalendarShow={handleCalendarShow}/>
          </section>
          <div className={`grid grid-cols-2 gap-[8px] ${isCalendarShow ? 'mb-[533px]' : 'mb-[166px]'} `}>
            <Checkbox
              type="outlined"
              label={filterTranslation.t('Available now') as string}
              register={register('availableChecked')}
              checked={watch('availableChecked')}
            />
          </div>
          <div className="fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
            <div className="w-full">
              <div className="mb-[13px]">
                <Button size="lg" type="submit" disabled={isNextStep()}
                  onClick={() => { console.log('dateAvailable', watch('dateAvailable'));}}
                >
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


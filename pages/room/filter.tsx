import React, { useState, useEffect, useCallback } from 'react';
import Router from 'next/router';
import FilterLayout from '@/components/layouts/FilterLayout.tsx';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import { Chip, Select, Typography, Toggle, Checkbox, Space, Button, Input } from '@/components/index.tsx';
import { FieldValues, FieldError, SubmitHandler, useForm } from 'react-hook-form';
import useRoomList from '@/hooks/useRoomList.ts';
import { isValidDate, isRequired } from '@/utils/validCheck.ts';
import { GuList, DongList } from '../../public/js/guDongList.ts';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['filter', 'common'])),
  },
});

export default function Filter() {
  const filterTranslation = useTranslation('common');
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
    setValue,
  } = useForm({ mode: 'onChange' });
  const [guValue, setGuValue] = useState('');
  const [dongValue, setDongValue] = useState<{ gu: string; value: string; label: string }>({
    gu: '',
    value: '',
    label: '',
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const filteredDongList = DongList.filter((v) => v.gu === guValue);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    Router.push(
      {
        pathname: '/',
        query: data,
      },
      '/'
    );
  };

  // 옵션 선택 시 실행될 함수
  const handleOptionSelect = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, option]);
  };

  // 옵션 제거 시 실행될 함수
  const handleOptionRemove = (option: string) => {
    setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((item) => item !== option));
  };

  useEffect(() => {
    if (dongValue.value !== '') {
      handleOptionSelect(dongValue.label);
    }
  }, [dongValue]);

  /** Dong Select Component 변경될 경우 -> 일반 선언형 함수로 정의할 경우 Rendering 마다 새로운 인스턴스가 생성됨 */
  const handleDongChange = useCallback(
    (selectedValue: string, selectedLabel: string) => {
      // 선택된 value와 label 값을 이용하여 원하는 작업 수행
      setDongValue({ value: selectedValue, label: selectedLabel, gu: watch('gu') });
      setValue('dong', selectedValue);
      alert('dongChanged');
    },
    [setValue, watch]
  );

  return (
    <>
      <div className="mt-[9px] mb-[20px]" key="filter">
        <Typography variant="header" fontStyle="semiBold">
          {filterTranslation.t('location')}
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          options={GuList}
          register={register('gu', {
            validate: (value) => {
              setGuValue(watch('gu'));
              return true;
            },
          })}
          placeholder={filterTranslation.t('gu') as string}
        />
        <Select
          options={filteredDongList}
          register={register('dong', {
            validate: (value) => {
              return true;
            },
          })}
          placeholder={filterTranslation.t('dong') as string}
          disabled={!watch('gu')}
          onChange={handleDongChange}
        />
        <div>
          {/* 선택된 옵션들에 대해 동적으로 Chip 컴포넌트 렌더링 */}
          {selectedOptions.map((option) => {
            return <Chip key={option} label={option} onDelete={() => handleOptionRemove(option)} clicked />;
          })}
        </div>
        <div className="py-[64px]">
          <div className="mt-[9px] mb-[4px]">
            <Typography variant="header" fontStyle="semiBold">
              {filterTranslation.t('deposit')}
            </Typography>
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('viewRoomsWithoutDeposit')}
            </Typography>
            <Toggle className="ml-2" register={register('depositToggle')} />
          </div>
          <div className="mb-[8px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('minMax')}
            </Typography>
          </div>
          <div className="mb-[8px]">
            <Input
              placeholder={filterTranslation.t('min') as string}
              type="number"
              register={register('depositMin', {
                validate: (value) => {
                  return true;
                  // return !!watch('depositToggle') && isRequired(value, '필수 항목');
                },
              })}
              disabled={!watch('depositToggle')}
            />
          </div>
          <Input
            placeholder={filterTranslation.t('max') as string}
            type="number"
            register={register('depositMax', {
              validate: (value) => {
                return true;
                // return !!watch('depositToggle') && isRequired(value, '필수 항목');
              },
            })}
            disabled={!watch('depositToggle')}
          />
          <div className="mt-[28px] mb-[4px]">
            <Typography variant="header" fontStyle="semiBold">
              {filterTranslation.t('monthRent')}
            </Typography>
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('includeMainFee')}
            </Typography>
            <Toggle className="ml-2" register={register('monthToggle')} />
          </div>
          <div className="mb-[8px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('minMax')}
            </Typography>
          </div>
          <div className="mb-[8px]">
            <Input
              placeholder={filterTranslation.t('monthMin') as string}
              type="number"
              register={register('monthMin', {
                validate: (value) => {
                  return true;
                  // return !!watch('monthToggle') && isRequired(value, '필수 항목');
                },
              })}
              disabled={!watch('monthToggle')}
            />
          </div>
          <Input
            placeholder={filterTranslation.t('monthMax') as string}
            type="number"
            register={register('monthMax', {
              validate: (value) => {
                return true;
                // return !!watch('monthToggle') && isRequired(value, '필수 항목');
              },
            })}
            disabled={!watch('monthToggle')}
          />
        </div>
        <div className="mt-[72px] mb-[4px]">
          <Typography variant="header" fontStyle="semiBold">
            {filterTranslation.t('dateAvailable')}
          </Typography>
        </div>
        <div className="flex justify-between items-center mb-[20px]">
          <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
            {filterTranslation.t('viewRoomsAvailable')}
          </Typography>
          <Toggle className="ml-2" register={register('dateAvailable')} />
        </div>
        <div className="mb-[16px]">
          <Input
            placeholder={filterTranslation.t('mmddyyyy') as string}
            type="text"
            register={register('mmddyyyy', {
              validate: (value: any) => {
                return true;
                // return !!watch('dateAvailable') && isRequired(value, '필수 항목');
              },
            })}
            disabled={!watch('dateAvailable')}
            // error={errors.mmddyyyy as FieldError}
          />
        </div>
        <hr className="mt-[40px] border-x-0" />
        <div className="mt-[32px] mb-[4px]">
          <Typography variant="header" fontStyle="semiBold">
            {filterTranslation.t('typeOfHousing')}
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
          <Checkbox
            type="outlined"
            label={filterTranslation.t('studio') as string}
            register={register('studioChecked')}
            checked={watch('studioChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('bedFlats') as string}
            register={register('bedFlatsChecked')}
            checked={watch('bedFlatsChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('shareHouse') as string}
            register={register('shareHouseChecked')}
            checked={watch('shareHouseChecked')}
          />
        </div>
        <hr className="mt-[32px] border-x-0" />
        <div className="mt-[32px] mb-[4px]">
          <Typography variant="header" fontStyle="semiBold">
            {filterTranslation.t('furnishing')}
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-[8px] mt-[12px] mb-[166px] ">
          <Checkbox
            type="outlined"
            label={filterTranslation.t('bed') as string}
            register={register('bedChecked')}
            checked={watch('bedChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('induction') as string}
            register={register('inductionChecked')}
            checked={watch('inductionChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('airconditioner') as string}
            register={register('airconditionerChecked')}
            checked={watch('airconditionerChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('gasStove') as string}
            register={register('gasStoveChecked')}
            checked={watch('gasStoveChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('refrigerator') as string}
            register={register('refrigeratorChecked')}
            checked={watch('refrigeratorChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('wardrobe') as string}
            register={register('wardrobeChecked')}
            checked={watch('wardrobeChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('washingMachine') as string}
            register={register('washingMachineChecked')}
            checked={watch('washingMachineChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('doorLock') as string}
            register={register('doorLockChecked')}
            checked={watch('doorLockChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('tv') as string}
            register={register('tvChecked')}
            checked={watch('tvChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('kitchenette') as string}
            register={register('kitchenetteChecked')}
            checked={watch('kitchenetteChecked')}
          />
        </div>
        <div className="mt-[83px] fixed bottom-[0px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
          <div className="w-full">
            <div className="mb-[13px] space-x-[8px] max-w-max">
              <Button type="reset" size="reset" color="noBg">
                {filterTranslation.t('reset')}
              </Button>
              <Button type="submit" size="apply">
                {/* TODO : 조회된 Room 개수로 변경 필요  */}
                {`${filterTranslation.t('apply')} (230 Rooms)`}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

/** RoomList 주석 추가 */
Filter.getLayout = function getLayout(page: React.ReactElement) {
  return <FilterLayout>{page}</FilterLayout>;
};

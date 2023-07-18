import React, { useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import FilterLayout from '@/components/layouts/FilterLayout.tsx';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import { Select, Typography, Toggle, Checkbox, Space, Button, Input } from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { guList as GuList, dongList as DongList } from './guDongList.tsx';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['filter', 'common'])),
  },
});

export default function Filter() {
  const filterTranslation = useTranslation('filter');
  const commonTranslation = useTranslation('common');
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    Router.push('/signup/step2');
  };
  // const GU = watch('Gu');
  const [guValue, setGuValue] = useState('');
  const filteredDongList = DongList.filter((v) => v.gu === guValue);
  return (
    <>
      <div className="mt-[9px] mb-[20px]">
        <Typography variant="header" fontStyle="semiBold">
          {filterTranslation.t('Location')}
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select
          options={GuList}
          register={register('Gu', {
            validate: (value: any) => {
              setGuValue(watch('Gu'));
              return value;
            },
          })}
          placeholder={filterTranslation.t('Gu') as string}
        />
        <Select
          options={filteredDongList}
          register={register('Dong')}
          placeholder={filterTranslation.t('Dong') as string}
          disabled={!watch('Gu')}
        />
        <div className="py-[64px]">
          <div className="mt-[9px] mb-[4px]">
            <Typography variant="header" fontStyle="semiBold">
              {filterTranslation.t('Deposit')}
            </Typography>
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('View rooms without deposit')}
            </Typography>
            <Toggle className="ml-2" />
          </div>
          <div className="mb-[8px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('Min 0 ￦ - Max 500,000,000 ￦ ')}
            </Typography>
          </div>
          <div className="mb-[8px]">
            <Input
              placeholder={filterTranslation.t('Min') as string}
              type="text"
              register={register('min', {
                validate: (value: any) => {
                  return value;
                },
              })}
            />
          </div>
          <Input
            placeholder={filterTranslation.t('Max') as string}
            type="text"
            register={register('max', {
              validate: (value: any) => {
                return value;
              },
            })}
          />
          <div className="mt-[28px] mb-[4px]">
            <Typography variant="header" fontStyle="semiBold">
              {filterTranslation.t('Monthly rent')}
            </Typography>
          </div>
          <div className="flex justify-between items-center mb-[20px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('Include maintenance fee')}
            </Typography>
            <Toggle className="ml-2" />
          </div>
          <div className="mb-[8px]">
            <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
              {filterTranslation.t('Min 0 ￦ - Max 500,000,000 ￦ ')}
            </Typography>
          </div>
          <div className="mb-[8px]">
            <Input
              placeholder={filterTranslation.t('Min') as string}
              type="text"
              register={register('min', {
                validate: (value: any) => {
                  return value;
                },
              })}
            />
          </div>
          <Input
            placeholder={filterTranslation.t('Max') as string}
            type="text"
            register={register('max', {
              validate: (value: any) => {
                return value;
              },
            })}
          />
        </div>
        <div className="mt-[72px] mb-[4px]">
          <Typography variant="header" fontStyle="semiBold">
            {filterTranslation.t('Date available')}
          </Typography>
        </div>
        <div className="flex justify-between items-center mb-[20px]">
          <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
            {filterTranslation.t('View rooms available now')}
          </Typography>
          <Toggle className="ml-2" />
        </div>
        <div className="mb-[16px]">
          <Input
            placeholder={filterTranslation.t('MM-DD-YYYY') as string}
            type="text"
            register={register('min', {
              validate: (value: any) => {
                return value;
              },
            })}
          />
        </div>
        <hr className="mt-[40px] border-x-0" />
        <div className="mt-[32px] mb-[4px]">
          <Typography variant="header" fontStyle="semiBold">
            {filterTranslation.t('Type of housing')}
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
          <Checkbox
            type="outlined"
            label={filterTranslation.t('Studio') as string}
            register={register('studioChecked')}
            checked={watch('studioChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('1bed flats') as string}
            register={register('bedFlatsChecked')}
            checked={watch('bedFlatsChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('Share house') as string}
            register={register('shareHouseChecked')}
            checked={watch('shareHouseChecked')}
          />
        </div>
        <hr className="mt-[32px] border-x-0" />
        <div className="mt-[32px] mb-[4px]">
          <Typography variant="header" fontStyle="semiBold">
            {filterTranslation.t('Furnishing')}
          </Typography>
        </div>
        <div className="grid grid-cols-2 gap-[8px] mt-[12px] mb-[166px] ">
          <Checkbox
            type="outlined"
            label={filterTranslation.t('Bed') as string}
            register={register('bedChecked')}
            checked={watch('bedChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('Wardrobe') as string}
            register={register('wardrobeChecked')}
            checked={watch('wardrobeChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('TV') as string}
            register={register('TVChecked')}
            checked={watch('TVChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('AirconditionerChecked') as string}
            register={register('airconditionerChecked')}
            checked={watch('airconditionerChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('HeaterChecked') as string}
            register={register('heaterChecked')}
            checked={watch('heaterChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('AirconditionerChecked') as string}
            register={register('airconditionerChecked')}
            checked={watch('airconditionerChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('HeaterChecked') as string}
            register={register('heaterChecked')}
            checked={watch('heaterChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('AirconditionerChecked') as string}
            register={register('airconditionerChecked')}
            checked={watch('airconditionerChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('HeaterChecked') as string}
            register={register('heaterChecked')}
            checked={watch('heaterChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('Washing machine') as string}
            register={register('washingMachineChecked')}
            checked={watch('washingMachineChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('Stove') as string}
            register={register('stoveChecked')}
            checked={watch('stoveChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('Refrigerator') as string}
            register={register('refrigeratorChecked')}
            checked={watch('refrigeratorChecked')}
          />
          <Checkbox
            type="outlined"
            label={filterTranslation.t('Door lock') as string}
            register={register('doorLockChecked')}
            checked={watch('doorLockChecked')}
          />
        </div>
        <div className="mt-[83px] fixed bottom-[0px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
          <div className="w-full">
            <div className="mb-[13px] space-x-[8px] max-w-max">
              <Button type="reset" size="reset" color="noBg">
                {commonTranslation.t('Reset')}
              </Button>
              <Button type="submit" size="apply">
                {/* TODO : 조회된 Room 개수로 변경 필요  */}
                {`${commonTranslation.t('Apply')} (230 Rooms)`}
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

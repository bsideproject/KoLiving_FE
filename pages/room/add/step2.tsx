import React, { useEffect, useMemo, useState } from 'react';
import { Stepper, Stepper2, Typography, Checkbox, Button } from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import MultiButton from '@/components/MultiButton/MultiButton';
import { Option } from '@/components/Select/Select';
import { fetchFurnishings } from '@/api/room';
import { useRouter } from 'next/router';
import { ROOM_TYPE, ROOM_TYPE_KEYS, ROOM_TYPE_LABEL } from '@/public/types/room';
import styles from './add.module.scss';

const ROOM_TYPE_OPTIONS = Object.entries(ROOM_TYPE).map(([label, value]) => ({
  label: ROOM_TYPE_LABEL[label as ROOM_TYPE_KEYS],
  value,
}));

const FURNISHIED = [
  {
    value: 'yes',
    label: 'YES',
  },
  {
    value: 'no',
    label: 'NO',
  },
];

export default function Step2() {
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const router = useRouter();
  const { query } = router;
  const step1Params = query.data ? JSON.parse(query.data as string) : {};

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const furnishingIds = Object.keys(data)
      .filter((key) => key.includes('furnishing-') && data[key])
      .map((key) => key.replace(/^furnishing-/, ''));

    const params = {
      ...step1Params,
      roomType: data.roomType.value,
      bedrooms: data.bedRooms,
      bathrooms: data.bathrooms,
      roommates: data.roommates,
      furnishingIds,
    };
    router.push(
      {
        pathname: '/room/add/step3',
        query: { data: JSON.stringify(params) },
      },
      '/room/add/step3'
    );
  };

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
    getFurnishings();
  }, []);

  const typeButton = watch('roomType');

  const bedRoomTotalCount = useMemo(() => {
    if (!typeButton) {
      return 0;
    }

    switch (typeButton.value) {
      case ROOM_TYPE.STUDIO:
        return 0;
      case ROOM_TYPE.SHARE:
        return 2;
      default:
        return 1;
    }
  }, [typeButton]);

  const isFurnishied = watch('isFurnishied')?.value;
  const furnishingValues = furnishings?.map((item) => watch(`furnishing-${item.value}`));

  const isDisabledNext = useMemo(() => {
    return isFurnishied === 'yes' && !furnishingValues?.some((item) => item);
  }, [isFurnishied, furnishingValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stepper step={2} totalStep={3} />
      <div className="mt-[9px] mb-[20px]">
        <Typography variant="header" fontStyle="semiBold">
          Fill in the details
        </Typography>
      </div>
      <div className="mb-[4px]">
        <div className={styles['sub-header']}>Type of housing</div>
      </div>
      <div className="mb-[32px]">
        <MultiButton options={ROOM_TYPE_OPTIONS} register={register('roomType')} />
      </div>

      <hr />

      <div className="py-[28px]">
        <div className="mb-[16px]">
          <div className={styles['sub-header']}>House Information</div>
        </div>
        <div className="flex justify-between items-center mb-[8px]">
          <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
            Total bedrooms
          </Typography>
          <Stepper2
            disabled={['Studio', '1bed flat'].includes(typeButton?.label)}
            register={register('bedRooms')}
            initCount={bedRoomTotalCount}
            disabledLeft={typeButton?.label === 'Share house' && watch('bedRooms') <= 2}
            disabledRight={typeButton?.label === 'Share house' && watch('bedRooms') >= 20}
          />
        </div>
        <div className="flex justify-between items-center mb-[8px]">
          <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
            Total bathrooms
          </Typography>
          <Stepper2
            register={register('bathrooms')}
            initCount={1}
            disabledLeft={watch('bathrooms') <= 1}
            disabledRight={watch('bathrooms') >= 20 || typeButton?.label === '1 bed flat'}
          />
        </div>
        <div className="flex justify-between items-center mb-[8px]">
          <Typography variant="label" fontStyle="semiBold" customClassName="text-[16px]">
            Total roommates
          </Typography>
          <Stepper2
            register={register('roommates')}
            initCount={1}
            disabledLeft={watch('roommates') <= 0}
            disabledRight={watch('roommates') >= 20}
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
        <MultiButton options={FURNISHIED} register={register('isFurnishied')} />
      </div>
      <div
        className={`grid grid-cols-2 gap-[12px] mt-[16px] ${
          watch('isFurnishied')?.value === 'yes' ? 'mb-[200px]' : 'mb-[166px]'
        }`}
      >
        {watch('isFurnishied')?.value === 'yes' &&
          furnishings &&
          furnishings.map((item) => {
            return (
              <Checkbox
                key={item.value}
                type="outlined"
                label={item.label}
                register={register(`furnishing-${item.value}`)}
              />
            );
          })}
      </div>
      <div className=" fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
        <div className="w-full">
          <div className="mb-[13px]">
            <Button size="lg" type="submit" disabled={isDisabledNext}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

Step2.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DefaultLayout title="Add Rooms" handleButtonClick={() => window.history.back()}>
      <div className="pt-[31px]">{page}</div>
    </DefaultLayout>
  );
};

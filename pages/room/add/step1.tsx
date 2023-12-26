import React, { useState, useEffect, useMemo } from 'react';
import { Stepper, Chip, Select, Typography, Checkbox, Button, Input, Calendar } from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { GuList, DongList } from '@/public/js/guDongList.ts';
import { Option } from '@/components/Select/Select';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import toast from 'react-hot-toast';
import MultiButton from '@/components/MultiButton/MultiButton';
import { useRouter } from 'next/router';
import { formatDateForAPI } from '@/utils/transform';
import { fetchFurnishings, getLocations } from '@/api/room';
import styles from './add.module.scss';

interface GuDong {
  gu: Option;
  dong: Option;
}

const MAINTANANCE_FEE_OPTIONS = [
  {
    value: 'yes',
    label: 'Yes',
  },
  {
    value: 'no',
    label: 'No',
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

interface DongOption extends Option {
  upperLocationId: number;
}

export default function AddRoom() {
  const { register, handleSubmit, watch, setValue } = useForm({ mode: 'onChange' });
  const [selectedLocations, setSelectedLocations] = useState<GuDong[]>([]);
  const router = useRouter();
  const [gus, setGus] = useState<Option[]>([]);
  const [dongs, setDongs] = useState<DongOption[]>([]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const params = {
      locationId: data.dong.value,
      monthlyRent: data.monthPrice,
      deposit: data.depositPrice,
      maintenanceFee: data.maintananceFee,
      availableDate: data.dateAvailable ? formatDateForAPI(data.dateAvailable) : null,
      gasIncluded: data.gasChecked,
      waterIncluded: data.waterChecked,
      electricityIncluded: data.electricityChecked,
      cleaningIncluded: data.cleaningChecked,
    };
    router.push(
      {
        pathname: '/room/add/step2',
        query: { data: JSON.stringify(params) },
      },
      '/room/add/step2'
    );
  };

  const gu = watch('gu');
  const dong = watch('dong');
  const monthPrice = watch('monthPrice');
  const depositPrice = watch('depositPrice');
  const noDeposit = watch('noDeposit');
  const availableNow = watch('availableNow');
  const dateAvailable = watch('dateAvailable');
  const isUseMaintananceFee = watch('isUseMaintananceFee');
  const maintananceFee = watch('maintananceFee');

  const isDisabledNextStep = useMemo(() => {
    return (
      !dong ||
      !monthPrice ||
      (!noDeposit && !depositPrice) ||
      (!dateAvailable && !availableNow) ||
      (isUseMaintananceFee?.value === 'yes' && !maintananceFee)
    );
  }, [
    availableNow,
    dateAvailable,
    depositPrice,
    dong,
    isUseMaintananceFee?.value,
    maintananceFee,
    monthPrice,
    noDeposit,
  ]);

  const filteredDongList = useMemo(() => {
    if (!gu) {
      return [];
    }

    return dongs.filter((v) => v.upperLocationId === gu.value);
  }, [gu, dongs]);

  useEffect(() => {
    if (monthPrice > 20000000) {
      setValue('monthPrice', 20000000);
    }
  }, [monthPrice, setValue]);

  useEffect(() => {
    if (depositPrice > 500000000) {
      setValue('depositPrice', 500000000);
    }
  }, [depositPrice, setValue]);

  useEffect(() => {
    if (maintananceFee > 5000000) {
      setValue('maintananceFee', 5000000);
    }
  }, [maintananceFee, setValue]);

  useEffect(() => {
    if (availableNow) {
      setValue('dateAvailable', '');
    }
  }, [availableNow, setValue]);

  useEffect(() => {
    if (noDeposit) {
      setValue('depositPrice', '');
    }
  }, [noDeposit, setValue]);

  const fetchLocations = async () => {
    try {
      if (sessionStorage.getItem('gu') && sessionStorage.getItem('dong')) {
        return;
      }

      const data = await getLocations();

      if (!data) {
        return;
      }

      const gusData = data
        .filter((location) => location.locationType === 'GU')
        .map((location) => {
          return {
            id: location.id,
            value: location.id,
            label: `${location.name}-gu`,
          };
        });
      setGus(gusData);
      sessionStorage.setItem('gu', JSON.stringify(gusData));

      const dongsData = data
        .filter((location) => location.locationType === 'DONG')
        .map((location) => {
          return {
            id: location.id,
            value: location.id,
            label: `${location.name}-dong`,
            upperLocationId: location.upperLocation.id,
          };
        });
      setDongs(dongsData);
      sessionStorage.setItem('dong', JSON.stringify(dongsData));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchLocations();
      if (sessionStorage.getItem('gu')) {
        setGus(JSON.parse(sessionStorage.getItem('gu') || '[]'));
      }

      if (sessionStorage.getItem('dong')) {
        setDongs(JSON.parse(sessionStorage.getItem('dong') || '[]'));
      }
    })();
  }, []);

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
          <Select options={gus} register={register('gu')} placeholder="Gu" />
          <Select options={filteredDongList} register={register('dong')} placeholder="Dong" disabled={!watch('gu')} />
        </div>
      </div>

      <hr />

      {/* Monthly rent */}
      <div className="my-[32px]">
        <div className="mb-[16px]">
          <div className={styles['sub-header']}>Monthly rent</div>
        </div>
        <div className="mb-[8px]">
          <div className="text-g5 text-[12px] font-normal">Min 0 ￦ - Max 200,000,000 ￦</div>
        </div>
        <div className="mb-[28px]">
          <Input
            placeholder="Price"
            type="tel"
            register={register('monthPrice')}
            maxLength={8}
            fixedWord={watch('monthPrice')}
          />
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
            type="tel"
            register={register('depositPrice')}
            disabled={watch('noDeposit')}
            maxLength={9}
            fixedWord={watch('depositPrice')}
          />
        </div>
        <div className="grid grid-cols-2 gap-[8px] mt-[12px]">
          <Checkbox type="outlined" label="No Deposit" register={register('noDeposit')} />
        </div>
      </div>

      {/* Maintanance fee */}
      <div className="mb-[4px] mt-[28px]">
        <div className="mb-[10px]">
          <div className={styles['sub-header']}> Maintanance fee</div>
        </div>
      </div>
      <div className="mb-[24px]">
        <MultiButton options={MAINTANANCE_FEE_OPTIONS} register={register('isUseMaintananceFee')} />
      </div>
      {watch('isUseMaintananceFee')?.value === 'yes' && (
        <>
          <div className="mb-[16px]">
            <Input
              placeholder="Price"
              type="tel"
              register={register('maintananceFee')}
              maxLength={7}
              fixedWord={watch('maintananceFee')}
            />
          </div>

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
        </>
      )}

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
          disabled={watch('availableNow')}
          fixedWord={watch('dateAvailable')}
        />
      </section>
      <div className="grid grid-cols-2 gap-[8px] mb-[166px]">
        <Checkbox type="outlined" label="Available now" register={register('availableNow')} />
      </div>
      <div className="fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
        <div className="w-full">
          <div className="mb-[13px]">
            <Button
              size="lg"
              type="submit"
              disabled={isDisabledNextStep}
              onClick={() => {
                watch('dateAvailable');
              }}
            >
              Next
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

import React, { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import Typography from '@/components/Typography/Typography.tsx';
import Stepper from '@/components/Stepper/Stepper.tsx';
import SignUpLayout from '@/components/layouts/SignUpLayout.tsx';
import Input from '@/components/Input/Input.tsx';
import { FieldError, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { isValidPassword } from '@/utils/validCheck.ts';
import Button from '@/components/Button/Button.tsx';
import Router from 'next/router';
import useSignUp from '@/hooks/useSignUp.ts';
import Radio from '@/components/Radio/Radio.tsx';
import Select from '@/components/Select/Select';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['signup', 'common'])),
  },
});

const options = [
  {
    label: 'male',
    value: 'male',
  },
  {
    label: 'female',
    value: 'female',
  },
  {
    label: 'other',
    value: 'other',
  },
];

const monthList = Array.from({ length: 12 }, (_, index) => ({
  value: index + 1,
  label: `${index + 1}`,
}));

// Year List
const currentYear = new Date().getFullYear();
const yearList = Array.from({ length: 10 }, (_, index) => ({
  value: currentYear - index,
  label: `${currentYear - index}`,
}));

// Day List
const dayList = Array.from({ length: 31 }, (_, index) => ({
  value: index + 1,
  label: `${index + 1}`,
}));

export default function SignUp() {
  const signUpTranslation = useTranslation('signup');
  const commonTranslation = useTranslation('common');
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ mode: 'onChange' });
  const { setSignUpData, signUpState } = useSignUp();
  const watchPassword1 = watch('password1', '');

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setSignUpData({
      password: data.password1,
    });

    // Router.push('/signup/step2');
  };

  const isDisabled = useMemo(() => {
    return !(
      watch('password1') &&
      errors.password1 === undefined &&
      watch('password2') &&
      errors.password2 === undefined
    );
  }, [errors.password1, errors.password2, watch]);

  const handleGenderChange = () => {};

  return (
    <>
      <Stepper step={3} totalStep={3} />
      <div className="mt-[9px] mb-[20px]">
        <Typography variant="header" fontStyle="semiBold">
          {signUpTranslation.t('step3Title')}
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-[30px]">
        <section>
          <p className="text-[16px] text-g7 font-semibold mb-[8px]">{signUpTranslation.t('name')}</p>
          <div className="mb-[8px]">
            <Input register={register('firstName')} placeholder={signUpTranslation.t('firstName') as string} />
          </div>
          <Input register={register('lastName')} placeholder={signUpTranslation.t('lastName') as string} />
        </section>
        <section>
          <p className="text-[16px] text-g7 font-semibold mb-[8px]">{signUpTranslation.t('gender')}</p>
          <Radio
            options={options}
            register={register('gender')}
            onChange={handleGenderChange}
            selectedOption={watch('gender')}
          />
        </section>
        <section>
          <p className="text-[16px] text-g7 font-semibold mb-[8px]">{signUpTranslation.t('dateOfBirth')}</p>
          <div className="grid grid-cols-3 gap-[8px]">
            <Select
              options={monthList}
              register={register('month')}
              placeholder={signUpTranslation.t('month') as string}
            />
            <Select
              options={yearList}
              register={register('year')}
              placeholder={signUpTranslation.t('year') as string}
            />
            <Select options={dayList} register={register('day')} placeholder={signUpTranslation.t('day') as string} />
          </div>
        </section>
        <section>
          <p className="text-[16px] text-g7 font-semibold mb-[8px]">{signUpTranslation.t('aboutYou')}</p>
          <Input register={register('firstName')} placeholder={signUpTranslation.t('firstName') as string} />
        </section>
        <div className="fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
          <div className="w-full">
            <div className="mb-[13px]">
              <Button size="lg" type="submit" disabled={isDisabled}>
                {commonTranslation.t('complete')}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

SignUp.getLayout = function getLayout(page: React.ReactElement) {
  return <SignUpLayout>{page}</SignUpLayout>;
};

import React, { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import Typography from '@/components/Typography/Typography.tsx';
import Stepper from '@/components/Stepper/Stepper.tsx';
import SignUpLayout from '@/components/layouts/SignUpLayout.tsx';
import Input from '@/components/Input/Input.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/Button/Button.tsx';
import useSignUp from '@/hooks/useSignUp.ts';
import Radio from '@/components/Radio/Radio.tsx';
import Select from '@/components/Select/Select.tsx';
import Textarea from '@/components/Textarea/Textarea.tsx';
import useModal from '@/hooks/useModal.ts';
import Router from 'next/router';

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
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });
  const { setSignUpData } = useSignUp();
  const { openModal, closeModal } = useModal();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await setSignUpData({
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      birth: `${data.year}-${data.month}-${data.day}`,
      introduce: data.introduce,
    });

    // TODO: 추후 API 연동
    openModal({
      props: {
        title: signUpTranslation.t('congratulation') as string,
        content: signUpTranslation.t('welcome') as string,
        buttonType: 'default',
        buttonName: signUpTranslation.t('startToExplore') as string,
        handleClose: () => {
          Router.push('/');
          closeModal();
        },
        hasCloseButton: true,
      },
    });
  };

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const gender = watch('gender');
  const month = watch('month');
  const day = watch('day');
  const year = watch('year');
  const introduce = watch('introduce');

  const isDisabled = useMemo(() => {
    return !(firstName && lastName && gender && month && day && year && introduce);
  }, [firstName, lastName, gender, month, day, year, introduce]);

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
          <Radio options={options} register={register('gender')} selectedOption={watch('gender')} />
        </section>
        <section>
          <p className="text-[16px] text-g7 font-semibold mb-[8px]">{signUpTranslation.t('dateOfBirth')}</p>
          <div className="grid grid-cols-3 gap-[8px]">
            <Select
              options={monthList}
              register={register('month')}
              placeholder={signUpTranslation.t('month') as string}
            />
            <Select options={dayList} register={register('day')} placeholder={signUpTranslation.t('day') as string} />
            <Select
              options={yearList}
              register={register('year')}
              placeholder={signUpTranslation.t('year') as string}
            />
          </div>
        </section>
        <section>
          <p className="text-[16px] text-g7 font-semibold mb-[8px]">{signUpTranslation.t('aboutYou')}</p>
          <Textarea placeholder={signUpTranslation.t('introduce') as string} register={register('introduce')} />
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

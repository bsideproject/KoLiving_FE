import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import Typography from '@/components/Typography/Typography.tsx';
import Stepper from '@/components/Stepper/Stepper.tsx';
import SignUpLayout from '@/components/layouts/SignUpLayout.tsx';
import Input from '@/components/Input/Input.tsx';
import { FieldError, useForm } from 'react-hook-form';
import { isValidEmail } from '@/utils/validCheck.ts';
import Checkbox from '@/components/Checkbox/Checkbox.tsx';
import Space from '@/components/Space';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['signup', 'common'])),
  },
});

export default function SignUp() {
  const signUpTranslation = useTranslation('signup');
  const commonTranslation = useTranslation('common');
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const [allChecked, setAllChecked] = useState(false);
  const handleAllCheck = () => {
    setAllChecked((value) => !value);
  };

  return (
    <>
      <Stepper step={1} totalStep={3} />
      <div className="mt-[9px] mb-[20px]">
        <Typography variant="header" fontStyle="semiBold">
          {signUpTranslation.t('createAccount')}
        </Typography>
      </div>
      <Input
        placeholder={signUpTranslation.t('emailPlaceholder') as string}
        type="email"
        register={register('email', {
          validate: (value) => {
            return isValidEmail(value, `${commonTranslation.t('validEmail')}`);
          },
        })}
        error={errors.email as FieldError}
      />
      <div className="fixed bottom-0 w-full overflow-x-hidden">
        <div className="w-full ">
          <Checkbox
            label={signUpTranslation.t('acceptAll') as string}
            checked={allChecked}
            onChange={handleAllCheck}
            type="outlined"
            bold
          />
          <hr className="my-[18px] border-x-0" />
          <div className="flex">
            <Checkbox
              label={signUpTranslation.t('termsOfService') as string}
              checked={allChecked}
              onChange={handleAllCheck}
              type="outlined"
            />
            <Space />
            <span>View</span>
          </div>
        </div>
      </div>
    </>
  );
}

SignUp.getLayout = function getLayout(page: React.ReactElement) {
  return <SignUpLayout>{page}</SignUpLayout>;
};

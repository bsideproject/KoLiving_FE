import React, { useEffect, useState } from 'react';
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
import Space from '@/components/Space.tsx';
import Button from '@/components/Button/Button.tsx';
import Router from 'next/router';

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
  const [yearChecked, setYearChecked] = useState(false);
  const [termChecked, setTermChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const handleAllCheck = () => {
    if (allChecked) {
      setAllChecked(false);
      setYearChecked(false);
      setTermChecked(false);
      setPrivacyChecked(false);
    } else {
      setAllChecked(true);
      setYearChecked(true);
      setTermChecked(true);
      setPrivacyChecked(true);
    }
  };

  useEffect(() => {
    if (yearChecked && termChecked && privacyChecked) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [yearChecked, termChecked, privacyChecked]);

  const goNext = () => {};

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
      <div className="fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
        <div className="w-full">
          <Checkbox
            label={signUpTranslation.t('acceptAll') as string}
            checked={allChecked}
            onChange={handleAllCheck}
            type="outlined"
            bold
          />
          <hr className="my-[18px] border-x-0" />
          <div className="flex mb-[12px]">
            <Checkbox
              label={signUpTranslation.t('14over') as string}
              checked={yearChecked}
              onChange={() => setYearChecked((value) => !value)}
              type="outlined"
              required
            />
            <Space />
            <span className="underline text-g5 text-[12px]">{signUpTranslation.t('view')}</span>
          </div>
          <div className="flex mb-[12px]">
            <Checkbox
              label={signUpTranslation.t('termsAndCondition') as string}
              checked={termChecked}
              onChange={() => setTermChecked((value) => !value)}
              type="outlined"
              required
            />
            <Space />
            <span className="underline text-g5 text-[12px]">{signUpTranslation.t('view')}</span>
          </div>
          <div className="flex mb-[16px]">
            <Checkbox
              label={signUpTranslation.t('privacyPolicies') as string}
              checked={privacyChecked}
              onChange={() => setPrivacyChecked((value) => !value)}
              type="outlined"
              required
            />
            <Space />
            <span className="underline text-g5 text-[12px]">{signUpTranslation.t('view')}</span>
          </div>
          <div className="mb-[13px]">
            <Button onClick={() => goNext()} size="lg">
              {commonTranslation.t('next')}
            </Button>
          </div>
          <div className="flex mb-[6px] justify-center">
            <p className="text-[14px]">{signUpTranslation.t('checkMember')}</p>
            <button
              className="text-[16px] text-r1 ml-1 underline"
              onClick={() => {
                Router.push('/login');
              }}
            >
              {signUpTranslation.t('login')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

SignUp.getLayout = function getLayout(page: React.ReactElement) {
  return <SignUpLayout>{page}</SignUpLayout>;
};

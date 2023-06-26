/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import ResetPasswordLayout from '@/components/layouts/ResetPasswordLayout.tsx';
import Space from '@/components/Space.tsx';
import Typography from '@/components/Typography/Typography.tsx';
import { FieldError, useForm as UseForm } from 'react-hook-form';
import Input from '@/components/Input/Input.tsx';
import { isRequired, isValidPassword, isSamePassword } from '@/utils/validCheck.ts';
import { useTranslation as UseTranslation } from 'next-i18next';
import Button from '@/components/Button/Button.tsx';
import ModalBox from '@/components/Modal/ModalBox.tsx';
import type { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { emit } from 'process';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

export default function step2() {
  const { t } = UseTranslation('common');
  const [resetPassword, setResetPassword] = useState(false);

  const {
    register,
    getValues,
    formState: { errors },
  } = UseForm({ mode: 'onChange' });

  const fnResetPassword = () => {
    console.log('error is ??', errors);
    return !errors.password?.message && !errors.passwordConfirm?.message && setResetPassword(true);
  };

  return (
    <div className="font-pretendard w-full">
      <div className="relative w-full h-[60px]">
        <Space />
      </div>
      <div className="h-[69px]">
        <Typography variant="label">
          STEP <span className="font-bold">1</span> OF <span className="font-bold">2</span>{' '}
        </Typography>
      </div>
      <Typography variant="header">Set your new password</Typography>
      <Typography variant="label">use 6~30 characters with a mix of letters & numbers</Typography>
      <div className="mb-2">
        <Input
          type="password"
          placeholder="Password"
          register={register('password', {
            validate: (value) => {
              return isRequired(value, '필수 항목') || isValidPassword(value, `${t('validPassword')}`);
            },
          })}
          error={errors.password as FieldError}
        />
      </div>
      <div className="mb-2 h-[404px]">
        <Input
          type="password"
          placeholder="Password"
          register={register('passwordConfirm', {
            validate: (value) => {
              return (
                isRequired(value, '필수 항목') ||
                isValidPassword(value, `${t('validPassword')}`) ||
                isSamePassword(getValues('password'), value, `${t('samePassword')}`)
              );
            },
          })}
          error={errors.passwordConfirm as FieldError}
        />
      </div>
      <Button
        type="submit"
        onClick={fnResetPassword}
        disabled={
          !getValues('password') ||
          !getValues('passwordConfirm') ||
          !!errors.password?.message ||
          !!errors.passwordConfirm?.message
        }
        size="lg"
      >
        Reset password
      </Button>

      {resetPassword && (
        <ModalBox
          title="Password changed!"
          content="Your password has been successfully changed."
          buttonType="default"
          buttonName="Try Log in"
          overlayClose
        />
      )}
    </div>
  );
}

step2.getLayout = function getLayout(page: React.ReactElement) {
  return <ResetPasswordLayout>{page}</ResetPasswordLayout>;
};

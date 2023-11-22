/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import ResetPasswordLayout from '@/components/layouts/ResetPasswordLayout.tsx';
import { Link, Stepper, Button, ModalBox, Input, Space, Typography } from '@/components/index.tsx';
import { FieldError, useForm as UseForm } from 'react-hook-form';
import { isValidEmail } from '@/utils/validCheck.ts';
import { useTranslation as UseTranslation } from 'next-i18next';
import type { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { postResetPassword } from '@/api/signup';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

export default function step1() {
  const { t } = UseTranslation('common');
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [authEmail, setAuthEmail] = useState(false);

  const {
    register,
    watch,
    getValues,
    formState: { errors },
  } = UseForm({ mode: 'onChange' });

  const fnAuthEmail = async () => {
    if (!errors.email?.message) {
      setAuthEmail(true);
      await postResetPassword(watch('email'));
    }
  };

  const handleResendLink = () => {
    setAuthEmail(false);
    fnAuthEmail();
  };

  return (
    <div className="font-pretendard w-full">
      <div className="relative w-full h-[60px]">
        <Space />
      </div>
      <div className="h-[69px]">
        <Stepper step={1} totalStep={2} />
      </div>
      <Typography variant="header">Forgotten your password? </Typography>
      <Typography variant="label">We&apos;ll send you a reset link to your email</Typography>
      <div className="mt-5 h-[404px]">
        <Input
          type="email"
          placeholder="Your email"
          register={register('email', {
            validate: (value) => {
              return isValidEmail(value, `${t('validEmail')}`);
            },
          })}
          error={errors.email as FieldError}
        />
      </div>
      <Button type="submit" onClick={fnAuthEmail} disabled={!watch('email') || !!errors.email?.message} size="lg">
        Next
      </Button>
      <div className="flex items-center justify-center mt-[9px]">
        <p className="mr-[4px] text-g6 text-[14px]">Remember password?</p>
        <Link href="/signup/step1" className="underline text-r1 font-semibold text-[14px] mb-[1px]">
          &nbsp;Log In
        </Link>
      </div>
      {authEmail && (
        <ModalBox
          title="Check Your Mail Box"
          content={`A reset link has just been sent to ${getValues('email')}`}
          buttonType="default"
          buttonName="Resend link"
          hasCloseButton
          handleClose={handleResendLink}
          overlayClose
        />
      )}
    </div>
  );
}

step1.getLayout = function getLayout(page: React.ReactElement) {
  return <ResetPasswordLayout>{page}</ResetPasswordLayout>;
};

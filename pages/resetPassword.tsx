import React, { useState } from 'react';
import ResetPasswordLayout from '@/components/layouts/ResetPasswordLayout.tsx';
import { useForm as UseForm } from 'react-hook-form';
import { useTranslation as UseTranslation } from 'next-i18next';
import type { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { emit } from 'process';
import { step1 as Step1 } from '@/pages/resetPassword/step1.tsx';

export default function ResetPassword() {
  return (
    <div className="font-pretendard w-full">
      <Step1 />
    </div>
  );
}

ResetPassword.getLayout = function getLayout(page: React.ReactElement) {
  return <ResetPasswordLayout>{page}</ResetPasswordLayout>;
};

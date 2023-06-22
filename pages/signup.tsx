import React from 'react';
import DefaultLayout from '@/components/layouts/DefaultLayout/DefaultLayout.tsx';
import Step1 from '@/components/SignUp/Step1.tsx';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import Typography from '@/components/Typography/Typography.tsx';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['signup'])),
  },
});

export default function SignUp() {
  const { t } = useTranslation('signup');

  return (
    <>
      <p>STEP 1 OF 3</p>
      <p>{t('createAccount')}</p>
      <Typography variant="header" fontStyle="semiBold">
        {t('createAccount')}
      </Typography>
      <Step1 />
    </>
  );
}

SignUp.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayout title="Sign up">{page}</DefaultLayout>;
};

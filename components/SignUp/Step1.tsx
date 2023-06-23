import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'next-i18next';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['signup'])),
  },
});

export default function Step1() {
  const { t } = useTranslation('signup');

  return <div>{t('createAccount')}</div>;
}

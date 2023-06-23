import React, { ReactNode } from 'react';
import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import DefaultLayout from './DefaultLayout.tsx';

interface AppLayoutProps {
  children: ReactNode;
}

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['signup'])),
  },
});

function SignUpLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation('signup');

  return (
    <DefaultLayout title={t('createAccount')}>
      <div className="pt-[31px]">{children}</div>
    </DefaultLayout>
  );
}

export default SignUpLayout;

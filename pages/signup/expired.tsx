import React, { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import Typography from '@/components/Typography/Typography.tsx';
import Stepper from '@/components/Stepper/Stepper.tsx';
import Button from '@/components/Button/Button.tsx';
import Header from '@/components/Header/Header.tsx';
import Router from 'next/router';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['signup', 'common'])),
  },
});

export default function SignUp() {
  const signUpTranslation = useTranslation('signup');

  return (
    <>
      <Stepper step={2} totalStep={3} />
      <div className="mt-[288px] mb-[20px] text-center">
        <Typography variant="header" fontStyle="semiBold">
          {signUpTranslation.t('expired')}
        </Typography>
        <p className="text-[14px]">{signUpTranslation.t('expiredDescription')}</p>
      </div>
      <div className="fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
        <div className="w-full">
          <div className="mb-[13px]">
            <Button size="lg" type="submit" onClick={() => Router.push('/signup/step1')}>
              {signUpTranslation.t('returnToSignUp')}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

SignUp.getLayout = function GetLayout(page: React.ReactElement) {
  const signUpTranslation = useTranslation('signup');

  return (
    <>
      <Header type="back" title={signUpTranslation.t('signup') as string} hasButton={false} />
      {page}
    </>
  );
};

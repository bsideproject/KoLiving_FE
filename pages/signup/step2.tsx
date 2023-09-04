import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import Typography from '@/components/Typography/Typography.tsx';
import Stepper from '@/components/Stepper/Stepper.tsx';
import SignUpLayout from '@/components/layouts/SignUpLayout.tsx';
import Input from '@/components/Input/Input.tsx';
import { FieldError, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { isValidPassword } from '@/utils/validCheck.ts';
import Button from '@/components/Button/Button.tsx';
import Router, { useRouter } from 'next/router';
import useSignUp from '@/hooks/useSignUp.ts';
import { postPassword } from '@/api/signup';

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
    handleSubmit,
    watch,
    setValue,
  } = useForm({ mode: 'onChange' });
  const { setSignUpData, signUpState } = useSignUp();
  const watchPassword1 = watch('password1', '');
  const router = useRouter();
  const { query } = router;
  const { email } = query;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setSignUpData({
      password: data.password1,
    });

    try {
      await postPassword({
        email: signUpState?.email || (email as string),
        password: data.password1,
      });
      Router.push('/signup/step3');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!signUpState) {
      return;
    }

    setValue('password1', signUpState.password);
    setValue('password2', signUpState.password);
  }, [signUpState, setValue]);

  const password1 = watch('password1');
  const password2 = watch('password2');

  const isDisabled = useMemo(() => {
    return !(password1 && password2 && !errors.password1 && !errors.password2);
  }, [errors.password1, errors.password2, password1, password2]);

  return (
    <>
      <Stepper step={2} totalStep={3} />
      <div className="mt-[9px] mb-[20px]">
        <Typography variant="header" fontStyle="semiBold">
          {signUpTranslation.t('setYourPassword')}
        </Typography>
        <p className="text-[14px]">{signUpTranslation.t('passwordDescription')}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[8px]">
          <Input
            register={register('password1', {
              validate: (value) => {
                return isValidPassword(value, `${signUpTranslation.t('invalidPassword')}`);
              },
            })}
            type="password"
            error={errors.password1 as FieldError}
          />
        </div>
        <Input
          register={register('password2', {
            validate: (value) => {
              return value === watchPassword1 || `${signUpTranslation.t('pleaseCheckAgain')}`;
            },
          })}
          type="password"
          error={errors.password2 as FieldError}
        />
        <div className="fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
          <div className="w-full">
            <div className="mb-[13px]">
              <Button size="lg" type="submit" disabled={isDisabled}>
                {commonTranslation.t('next')}
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

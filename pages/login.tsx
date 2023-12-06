import React, { useEffect } from 'react';
import type { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { FieldError, useForm } from 'react-hook-form';
import { LoginLayout, Link, CustomImage, Button, Input, Space } from '@/components/index.tsx';
import { isRequired, isValidEmail, isValidPassword } from '@/utils/validCheck.ts';
import { signIn } from 'next-auth/react';
import { getProfile } from '@/api/userInfo';
import useUserInfo from '@/hooks/useUserInfo.ts';
import { useRouter } from 'next/router';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

export default function Login() {
  const { t } = useTranslation('common');
  const { setUserInfoData, userInfoState } = useUserInfo();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setError,
  } = useForm({ mode: 'onChange' });

  const email = watch('email');
  const password = watch('password');

  const selectProfile = async () => {
    try {
      const data = await getProfile();
      if (data != null) {
        setUserInfoData(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const router = useRouter();
  const onSubmit = async () => {
    const data = await signIn('email-password-credential', {
      email,
      password,
      redirect: false,
    });
    if (data?.status !== 200) {
      setError('password', { type: 'validate', message: 'Invalid email or password' });
      return;
    }
    await selectProfile();
    router.push('/');
  };

  const isDisabledButton = !email || !password || !isValidEmail(email) || !isValidPassword(password);

  return (
    <div className="w-full font-pretendard">
      <div className="relative h-[422px] mb-7 w-[calc(100%+40px)] -left-[20px]">
        <CustomImage
          src="/images/thumb.png"
          alt="Koliving"
          width={0}
          height={0}
          layout="fill"
          objectFit="object-cover"
        />
      </div>
      <div className="m-[auto]">
        <div className="mb-4 text-2xl font-semibold text-G6 font-poppins">{t('welcome')}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <Input
              type="email"
              placeholder="Email"
              register={register('email', {
                validate: (value) => {
                  return isRequired(value, '필수 항목') || isValidEmail(value, `${t('validEmail')}`);
                },
              })}
              error={errors.email as FieldError}
            />
          </div>
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
          <div className="flex mb-[37px]">
            <Space />
            <Link href="/resetPassword/step1" className="underline text-g5 text-[14px]">
              {t('resetPwd')}
            </Link>
          </div>
          <Button disabled={isDisabledButton} size="lg" type="submit">
            Login
          </Button>
          <div className="flex items-center justify-center mt-[9px]">
            <p className="mr-[4px] text-g6 text-[14px]">Don&apos;t have account?</p>
            <Link href="/signup/step1" className="underline text-r1 font-semibold text-[14px] mb-[8px]">
              {t('signup')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

Login.getLayout = function getLayout(page: React.ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

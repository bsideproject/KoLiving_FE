import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import type { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { FieldError, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Button from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';
import { isRequired, isValidEmail, isValidPassword } from '../../utils/validCheck.ts';
import Link from '../../components/Link/HyperLink.tsx';
import CustomImage from '../../components/Image/CustomImage.tsx';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

export default function Login() {
  const router = useRouter();
  const doLogin = () => {
    // 상세 페이지로 이동
    router.push('/main');
  };
  const { t } = useTranslation('common');
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  return (
    <div className="font-pretendard bg-slate-400 w-full min-h-screen">
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <CustomImage src="/images/thumb.png" alt="Koliving" tp="signin" width={331} />
        <span className="font-semibold text-2xl text-G6 font-poppins">{t('welcome')}</span>
        <form>
          <Input
            type="email"
            placeholder="Email"
            register={register('email', {
              validate: (value) => {
                return isRequired(value, '필수 항목') || isValidEmail(value, `${t('validEmail')}`);
              },
            })}
            error={errors['email'] as FieldError}
          />
          <Input
            type="password"
            placeholder="Password"
            register={register('password', {
              validate: (value) => {
                return isRequired(value, '필수 항목') || isValidPassword(value, `${t('validPassword')}`);
              },
            })}
            error={errors['password'] as FieldError}
          />
          <Link href="/resetPassword">{t('resetPwd')}</Link>
          <Button onClick={doLogin} disabled={false} size="lg">
            Login
          </Button>
          <Link href="/signup" innerText={"Don't have Account?"} innerClassType="login">
            {t('signup')}
          </Link>
        </form>
      </div>
    </div>
  );
}

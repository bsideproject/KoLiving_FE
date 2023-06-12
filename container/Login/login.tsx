import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import type { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { FieldError, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Button from '../../components/Button/Button.tsx';
import Input from '../../components/Input/Input.tsx';
import { isRequired } from '../../utils/validCheck.ts';
import Link from '../../components/Link/HyperLink.tsx';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

export default function Login() {
  const router = useRouter();
  const doLogin = () => {
    // 로그인이 성공하면 Koliving Main Page로 이동
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
        <span className="font-semibold text-2xl text-r1 font-poppins">{t('welcome')}</span>
        <form>
          <Input
            type="email"
            placeholder="Email"
            register={register('email', {
              validate: (value) => {
                return isRequired(value, '필수 항목');
              },
            })}
            error={errors.name as FieldError}
          />
          <Input
            type="password"
            placeholder="Password"
            register={register('name', {
              validate: (value) => {
                return isRequired(value, '필수 항목');
              },
            })}
            error={errors.name as FieldError}
          />
          <Link href="/resetPassword">{t('resetPwd')}</Link>
          {/** TODO email, password 값이 있을 때만 Login Button 활성화 disabled {} 안에 처리 필요  */}
          <Button onClick={doLogin} disabled={false} size="lg">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

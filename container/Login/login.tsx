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
        <div className="relative w-full h-[422px] mb-7">
          <CustomImage
            src="/images/thumb.png"
            alt="Koliving"
            width={0}
            height={0}
            layout="fill"
            objectFit="object-cover"
          />
        </div>
        <div className="font-semibold text-2xl text-G6 font-poppins mb-4">{t('welcome')}</div>
        <form>
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
          <div className="mb-9">
            <Link href="/resetPassword">{t('resetPwd')}</Link>
          </div>
          <div className="mb-2">
            <Button onClick={doLogin} disabled={false} size="lg">
              Login
            </Button>
          </div>
          <Link href="/signup" innerText={"Don't have Account?"} innerClassType="login">
            {t('signup')}
          </Link>
        </form>
      </div>
    </div>
  );
}

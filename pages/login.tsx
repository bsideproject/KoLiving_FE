import React from 'react';
import type { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { FieldError, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Button from '@/components/Button/Button.tsx';
import Input from '@/components/Input/Input.tsx';
import { isRequired, isValidEmail, isValidPassword } from '@/utils/validCheck.ts';
import Link from 'next/link';
import CustomImage from '@/components/CustomImage/CustomImage.tsx';
import LoginLayout from '@/components/layouts/LoginLayout.tsx';
import Space from '@/components/Space.tsx';

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
    <div className="font-pretendard w-full">
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
          <div className="flex mb-[37px]">
            <Space />
            <Link href="/resetPassword/step1" className="underline text-g5 text-[14px]">
              {t('resetPwd')}
            </Link>
          </div>
          <Button onClick={doLogin} disabled={false} size="lg">
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

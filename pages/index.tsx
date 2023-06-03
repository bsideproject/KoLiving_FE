import React from 'react';
import type { GetStaticPropsContext } from 'next';
import 'tailwindcss/tailwind.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { FieldError, useForm } from 'react-hook-form';
import Input from '../components/Input/Input.tsx';
import { isRequired } from '../utils/validCheck.ts';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

const Home = () => {
  const { t } = useTranslation('common');
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  return (
    <div className="font-pretendard bg-slate-400 py-20 px-10 grid gap-10 min-h-screen">
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <span className="font-semibold text-2xl text-r1 font-poppins">{t('welcome')}</span>
        <form>
          <Input
            placeholder="test"
            register={register('name', {
              validate: (value) => {
                return isRequired(value, '필수 항목');
              },
            })}
            error={errors.name as FieldError}
          />
        </form>
      </div>
    </div>
  );
};

export default Home;

import React from 'react';
import type { GetStaticPropsContext } from 'next';
import 'tailwindcss/tailwind.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { FieldError, useForm } from 'react-hook-form';
import Input from '../components/Input/Input.tsx';
import { isRequired } from '../utils/validCheck.ts';
import Select from '../components/Select/Select.tsx';
import Button from '../components/Button/Button.tsx';
import Modal from '../components/Modal/Modal.tsx';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

const test = [
  {
    value: '1',
    label: 'test1',
  },
  {
    value: '2',
    label: 'test2',
  },
  {
    value: '3',
    label: 'test3',
  },
];

const Home = () => {
  const { t } = useTranslation('common');
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const handleClick = () => {
    console.log('Button clicked');
  };

  const [isOpen, setIsOpen] = React.useState(false);

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
          <Select options={test} register={register('age')} placeholder="test" size="lg" />
        </form>
        <button type="button" onClick={() => setIsOpen(true)}>
          test
        </button>
        {isOpen && <Modal onClose={() => setIsOpen(false)} />}
      </div>
    </div>
  );
};

export default Home;

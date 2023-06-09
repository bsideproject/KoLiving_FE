import React, { ChangeEvent, useState } from 'react';
import type { GetStaticPropsContext } from 'next';
import 'tailwindcss/tailwind.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { FieldError, useForm } from 'react-hook-form';
import Input from '../components/Input/Input.tsx';
import { isRequired } from '../utils/validCheck.ts';
import Select from '../components/Select/Select.tsx';
import Button from '../components/Button/Button.tsx';
import Link from '../components/Link/HyperLink.tsx';
import useModal from '../hooks/useModal.ts';

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

const radioOptions = [
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
  const { openModal } = useModal();

  const doLogin = () => {
    console.log('버튼 클릭 시 Login 완료 이후 페이지로 이동 필요');
  };

  const handleClick = () => {
    openModal({
      props: {
        hasCloseButton: true,
        overlayClose: true,
        title: 'Title',
        content: 'Lorem ipsum dolor sit amet consectetur. Varius nunc aliquam nullam vitae.',
      },
    });
  };

  const [selectedRadioOption, setSelectedRadioOption] = useState('');
  const [text, setText] = useState('');

  const handleRadioChange = (value: string) => {
    setSelectedRadioOption(value);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
  };

  return (
    <div className="font-pretendard bg-slate-400 w-full min-h-screen">
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
          <Link href="/resetPassword">{t('resetPwd')}</Link>
          {/** TODO email, password 값이 있을 때만 Login Button 활성화 disabled {} 안에 처리 필요  */}
          <Button onClick={doLogin} disabled={false} size="lg">
            Login
          </Button>
        </form>
        <button type="button" onClick={() => handleClick()}>
          test
        </button>
        {/* <Radio options={radioOptions} onChange={handleRadioChange} selectedOption={selectedRadioOption} /> */}
        {/* <Textarea placeholder="Koliving" value={text} onChange={handleTextChange} /> */}
      </div>
    </div>
  );
};

export default Home;

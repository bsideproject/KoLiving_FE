import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';
import Typography from '@/components/Typography/Typography.tsx';
import FilterLayout from '@/components/layouts/FilterLayout.tsx';
import Select from '@/components/Select/Select.tsx';
import Input from '@/components/Input/Input.tsx';
import { FieldError, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { isValidEmail } from '@/utils/validCheck.ts';
import Checkbox from '@/components/Checkbox/Checkbox.tsx';
import Space from '@/components/Space.tsx';
import Button from '@/components/Button/Button.tsx';
import Router from 'next/router';
import useSignUp from '@/hooks/useSignUp.ts';
import useModal from '@/hooks/useModal.ts';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['signup', 'common'])),
  },
});

export default function Filter() {
  const filterTranslation = useTranslation('filter');
  const commonTranslation = useTranslation('common');
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({ mode: 'onChange' });

  const { setSignUpData, signUpState } = useSignUp();
  const { openModal } = useModal();

  const handleAllCheck = (checked: boolean) => {
    if (!checked) {
      setValue('yearChecked', false);
      setValue('termChecked', false);
      setValue('privacyChecked', false);
    } else {
      setValue('yearChecked', true);
      setValue('termChecked', true);
      setValue('privacyChecked', true);
    }
  };

  useEffect(() => {
    if (!signUpState) {
      return;
    }

    if (signUpState.email) {
      setValue('email', signUpState.email);
    }

    if (signUpState.yearChecked) {
      setValue('yearChecked', signUpState.yearChecked);
    }

    if (signUpState.termChecked) {
      setValue('termChecked', signUpState.termChecked);
    }

    if (signUpState.privacyChecked) {
      setValue('privacyChecked', signUpState.privacyChecked);
    }
  }, [signUpState, setValue]);

  const privacyChecked = watch('privacyChecked');
  const termChecked = watch('termChecked');
  const yearChecked = watch('yearChecked');
  const email = watch('email');

  useEffect(() => {
    if (yearChecked && termChecked && privacyChecked) {
      setValue('allChecked', true);
    } else {
      setValue('allChecked', false);
    }
  }, [privacyChecked, termChecked, yearChecked, setValue]);

  const isNextDisabled = useMemo(() => {
    if (privacyChecked && termChecked && yearChecked && email && errors.email === undefined) {
      return false;
    }
    return true;
  }, [privacyChecked, termChecked, yearChecked, email, errors.email]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setSignUpData({
      email: data.email,
      yearChecked: data.yearChecked,
      termChecked: data.termChecked,
      privacyChecked: data.privacyChecked,
    });

    Router.push('/signup/step2');
  };

  const getTitle = (type: string) => {
    switch (type) {
      case 'year':
        return filterTranslation.t('14over') as string;
      case 'term':
        return filterTranslation.t('termsAndCondition') as string;
      case 'privacy':
        return filterTranslation.t('privacyPolicies') as string;
      default:
        return '';
    }
  };

  const viewDetail = (type: string) => () => {
    openModal({
      props: {
        title: getTitle(type),
        content: `Lorem ipsum dolor sit amet consectetur. Libero diam mattis orci malesuada pellentesque rutrum placerat porta. Neque nulla sit vitae sit at. Sapien iaculis ac consequat amet rhoncus sagittis. Viverra arcu commodo non enim felis sem. Tortor duis nunc aliquam odio dictumst risus ac amet. Etiam lorem ac non id ut rutrum ornare. In quisque rhoncus ac cursus ullamcorper sit. Cras diam lobortis faucibus lectus viverra. Nulla sit at mi eget faucibus viverra consequat in scelerisque.
        Lorem ipsum dolor sit amet consectetur. Libero diam mattis orci malesuada pellentesque rutrum placerat porta. Neque nulla sit vitae sit at. Sapien iaculis ac consequat amet rhoncus sagittis. Viverra arcu commodo non enim felis sem. Tortor duis nunc aliquam odio dictumst risus ac amet. Etiam lorem ac non id ut rutrum ornare. In quisque rhoncus ac cursus ullamcorper sit. Cras diam lobortis faucibus lectus viverra. Nulla sit at mi eget faucibus viverra consequat in scelerisque.`,
        size: 'full',
      },
    });
  };

  return (
    <>
      <div className="mt-[9px] mb-[20px]">
        <Typography variant="header" fontStyle="semiBold">
          {filterTranslation.t('Location')}
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Select options={[]} register={register('day')} placeholder={filterTranslation.t('Gu') as string} />
        <div className="fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
          <div className="w-full">
            <Checkbox
              label={filterTranslation.t('acceptAll') as string}
              type="outlined"
              bold
              onChange={handleAllCheck}
              register={register('allChecked')}
              checked={watch('allChecked')}
            />
            <hr className="my-[18px] border-x-0" />
            <div className="flex mb-[12px]">
              <Checkbox
                label={filterTranslation.t('14over') as string}
                required
                register={register('yearChecked')}
                checked={watch('yearChecked')}
              />
              <Space />
              <button className="underline text-g5 text-[12px]" onClick={viewDetail('year')} type="button">
                {filterTranslation.t('view')}
              </button>
            </div>
            <div className="flex mb-[12px]">
              <Checkbox
                label={filterTranslation.t('termsAndCondition') as string}
                required
                register={register('termChecked')}
                checked={watch('termChecked')}
              />
              <Space />
              <button className="underline text-g5 text-[12px]" onClick={viewDetail('term')} type="button">
                {filterTranslation.t('view')}
              </button>
            </div>
            <div className="flex mb-[16px]">
              <Checkbox
                label={filterTranslation.t('privacyPolicies') as string}
                required
                register={register('privacyChecked')}
                checked={watch('privacyChecked')}
              />
              <Space />
              <button className="underline text-g5 text-[12px]" onClick={viewDetail('privacy')} type="button">
                {filterTranslation.t('view')}
              </button>
            </div>
            <div className="mb-[13px]">
              <Button size="lg" type="submit" disabled={isNextDisabled}>
                {commonTranslation.t('next')}
              </Button>
            </div>
            <div className="flex mb-[6px] justify-center">
              <p className="text-[14px]">{filterTranslation.t('checkMember')}</p>
              <button
                className="text-[16px] text-r1 ml-1 underline"
                onClick={() => {
                  Router.push('/login');
                }}
                type="button"
              >
                {filterTranslation.t('login')}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

/** RoomList 주석 추가 */
Filter.getLayout = function getLayout(page: React.ReactElement) {
  return <FilterLayout>{page}</FilterLayout>;
};

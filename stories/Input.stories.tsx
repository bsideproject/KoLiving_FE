import React from 'react';
import { FieldError, useForm } from 'react-hook-form';
import Input from '../components/Input/Input';
import { isRequired, isValidEmail, isValidPassword } from '../utils/validCheck';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    type: {
      options: ['text', 'email', 'password'],
      control: {
        type: 'select',
      },
    },
    register: { table: { disable: true } },
    error: { table: { disable: true } },
    validate: { table: { disable: true } },
    name: { table: { disable: true } },
  },
};

const Template = (args) => {
  const {
    register,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  return (
    <form>
      <Input
        {...args}
        register={register(args.name, {
          validate: args.validate,
        })}
        error={errors[args.name] as FieldError}
      />
    </form>
  );
};

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  name: 'name',
  placeholder: '기본 Input',
};

export const MaxLength = Template.bind({});
MaxLength.args = {
  type: 'text',
  name: 'name',
  placeholder: '최대 5자',
  maxLength: 5,
};

export const Required = Template.bind({});
Required.args = {
  type: 'text',
  name: 'name',
  placeholder: '필수 항목일 때',
  validate: (value) => {
    return isRequired(value, '필수 항목입니다.');
  },
};

export const Email = Template.bind({});
Email.args = {
  type: 'email',
  name: 'email',
  placeholder: 'ywlee@koliving.com',
  validate: (value) => {
    return isValidEmail(value, '이메일 형식이 아닙니다.');
  },
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  name: 'password',
  placeholder: '비밀번호',
  maxLength: 30,
  validate: (value) => {
    return isValidPassword(value, '비밀번호 형식이 아닙니다');
  },
};

const PasswordCheckTemplate = (args) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const watchPassword1 = watch('password1', '');
  return (
    <form>
      <Input
        {...args}
        register={register('password1', {
          validate: (value) => {
            return isValidPassword(value, '비밀번호 형식이 아닙니다');
          },
        })}
        error={errors['password1'] as FieldError}
      />
      <Input
        {...args}
        register={register('password2', {
          validate: (value) => {
            return value === watchPassword1 || '비밀번호가 일치하지 않습니다.';
          },
        })}
        error={errors['password2'] as FieldError}
      />
    </form>
  );
};

export const PasswordMatch = PasswordCheckTemplate.bind({});
PasswordMatch.args = {
  type: 'password',
  placeholder: '비밀번호',
  maxLength: 30,
};

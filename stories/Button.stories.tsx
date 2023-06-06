import React from 'react';
import { FieldError, useForm } from 'react-hook-form';
import Button from '../components/Button/Button';
import { isRequired, isValidEmail, isValidPassword } from '../utils/validCheck';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { table: { disable: true } },
  },
};

const Template = (args) => {
  const handleClick = () => {
    console.log('test');
  };

  return (
    <Button onClick={handleClick} {...args}>
      test
    </Button>
  );
};

export const Small = Template.bind({});
Small.args = {
  // type: 'text',
  // name: 'name',
  // placeholder: '기본 Input',
  size: 'small',
};
export const Medium = Template.bind({});
Medium.args = {
  // type: 'text',
  // name: 'name',
  // placeholder: '기본 Input',
  size: 'medium',
};

export const Disabled = Template.bind({});
Disabled.args = {
  // type: 'text',
  // name: 'name',
  // placeholder: '기본 Input',
  disabled: true,
};

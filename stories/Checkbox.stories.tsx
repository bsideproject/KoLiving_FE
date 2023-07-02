import React from 'react';
import Checkbox from '../components/Checkbox/Checkbox';
import { useForm } from 'react-hook-form';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};

const Template = (args) => {
  const { register } = useForm();

  return <Checkbox {...args} register={register('test')} />;
};

export const Default = Template.bind({});
Default.args = {
  type: 'basic',
  label: 'default',
  bold: false,
};
export const Outlined = Template.bind({});
Outlined.args = {
  type: 'outlined',
  label: 'outlined',
  bold: true,
};

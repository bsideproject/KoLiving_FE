import React from 'react';
import Select from '../components/Select/Select';
import { isEmpty } from 'lodash-es';

export default {
  title: 'Components/Select',
  component: Select,
};

const options = [
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

const Template = (args) => {
  return <>{!isEmpty(args.options) && <Select {...args} />}</>;
};

export const Small = Template.bind({});
Small.args = {
  placeholder: '기본 Input',
  size: 'sm',
  options,
};

export const Large = Template.bind({});
Large.args = {
  placeholder: '기본 Input',
  size: 'lg',
  options,
};

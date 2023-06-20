import React from 'react';
import Checkbox from '../components/Checkbox/Checkbox';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
};

const Template = (args) => {
  return <Checkbox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  type: 'basic',
};
export const Outlined = Template.bind({});
Outlined.args = {
  type: 'outlined',
};

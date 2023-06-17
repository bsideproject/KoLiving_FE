import React from 'react';
import Header from '../app/components/Header/Header';

export default {
  title: 'Components/Header',
  component: Header,
  argTypes: {
    bgColor: { table: { disable: true } },
    type: { table: { disable: true } },
  },
};

const Template = (args) => {
  return <Header {...args} />;
};

export const Logo = Template.bind({});
Logo.args = {
  type: 'logo',
  logoColor: 'black',
  bgColor: 'white',
};
export const Back = Template.bind({});
Back.args = {
  type: 'back',
  title: 'Title',
  right: 'pencil',
};

import React from 'react';
import DefaultLayout from '@/components/layouts/DefaultLayout/DefaultLayout.tsx';

export default function SignUp() {
  return <div>signup</div>;
}

SignUp.getLayout = function getLayout(page: React.ReactElement) {
  return <DefaultLayout title="Sign up">{page}</DefaultLayout>;
};

/* eslint-disable react/no-children-prop */
import React from 'react';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import Nav from '@/components/Nav/Nav';

export default function Liked() {
  return (
    <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
      <div className="w-full">
        <div className="mb-[13px] space-x-[8px] max-w-max">
          <Nav initMenu={2} />
        </div>
      </div>
    </div>
  );
}

Liked.getLayout = function getLayout(page: React.ReactElement) {
  const handleGoBack = () => {
    window.history.back();
  };
  return <DefaultLayout children={page} title="Liked" handleButtonClick={handleGoBack} />;
};

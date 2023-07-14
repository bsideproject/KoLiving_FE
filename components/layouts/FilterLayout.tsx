import React, { ReactNode } from 'react';
import Header from '@/components/Header/Header.tsx';

interface AppLayoutProps {
  children: ReactNode;
}

function FilterLayout({ children }: AppLayoutProps) {
  const handleButtonClick = () => {
    alert('add!!');
  };

  return (
    <>
      <Header
        type="title"
        bgColor="white"
        title="Filters"
        handleButtonClick={handleButtonClick}
        right="close"
        titleStyles="font-pretendard font-bold pt-[13px]"
      />
      <div className="mx-auto mt-[54px]">{children}</div>
    </>
  );
}

export default FilterLayout;

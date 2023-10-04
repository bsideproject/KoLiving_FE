/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import NoPosting from '@/public/icons/noPosting.svg';
import Step1 from '@/pages/room/addRoom/step1.tsx';
import useModal from '@/hooks/useModal';
import DefaultLayout from '@/components/layouts/DefaultLayout';
// import { useRouter } from 'next/router';

// TODO 데이터가 구체화되면 바꿔줘야함
interface MyPostingProps {
  roomInfo: any | null;
}

export default function MyPosting({ roomInfo }: MyPostingProps) {
  const { openModal } = useModal();
  const handleAddPosting = () => {
    openModal({
      props: {
        title: 'Add Rooms',
        size: 'full',
        custom: true,
        customHeader: true,
      },
      children: <Step1 />,
    });
  };

  /**
   *  룸이 없을 때 보여주는 Component
   */
  const NoPostings = () => {
    const noPostingStyle = 'text-[20px] font-bold mt-[29px] text-center';
    const containerStyle = 'h-screen flex flex-col items-center justify-start mt-[135px]'; // 'justify-start'로 변경

    return (
      <div className={containerStyle}>
        <NoPosting />
        <div className={noPostingStyle}>Click here to post and find roommates!</div>
        <div className="mt-[29px]">
          <button
            className="font-pretendard text-[16px] font-semibold bg-g0 border border-solid border-r1 rounded-[2px] text-r1 w-[120px] h-[48px]"
            onClick={() => handleAddPosting()}
            type="button"
            data-size="md"
          >
            + Add post
          </button>
        </div>
      </div>
    );
  };

  /**
   * 룸이 있을 때 보여주는 Component (TODO : 구체화 해줘야함)
   */
  const MyRooms = () => {
    return <div>호이호이</div>;
  };
  return (roomInfo || []).length === 0 ? <NoPostings /> : <MyRooms />;
}

MyPosting.getLayout = function getLayout(page: React.ReactElement) {
  const handleGoBack = () => {
    window.history.back();
  };
  return <DefaultLayout children={page} title="My postings" handleButtonClick={handleGoBack} />;
};

/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import NoLiked from '@/public/icons/noLiked.svg';
import useModal from '@/hooks/useModal';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { Nav } from '@/components/index.tsx';

// TODO 데이터가 구체화되면 바꿔줘야함
interface MyPostingProps {
  roomInfo: any | null;
}

export default function Liked({ roomInfo }: MyPostingProps) {
  const { openModal } = useModal();
  const handleAddPosting = () => {
    // openModal({
    //   props: {
    //     title: 'Add Rooms',
    //     size: 'full',
    //     custom: true,
    //     customHeader: true,
    //   },
    //   children: <Step1 />,
    // });
  };

  /**
   *  좋아요 없을 때 보여주는 Component
   */
  const NoPostings = () => {
    const noPostingStyle = 'text-[20px] font-bold mt-[29px] text-center';
    const containerStyle = 'flex flex-col items-center justify-start mt-[135px]'; // 'justify-start'로 변경

    return (
      <div className={containerStyle}>
        <NoLiked />
        <div className={noPostingStyle}>{`You don't have liked room`}</div>
        <div className="text-[16px] text-g5 font-pretendard">{`There aren't any rooms you liked yet.`}</div>
        <div className="text-[16px] text-g5 font-pretendard">Find places that you like!</div>
        <div className="mt-[29px]">
          <button
            className="font-pretendard text-[16px] font-semibold bg-g0 border border-solid border-r1 rounded-[2px] text-r1 w-[120px] h-[48px]"
            onClick={() => handleAddPosting()}
            type="button"
            data-size="md"
          >
            Look around
          </button>
        </div>
        <div className="fixed bottom-[0px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
          <div className="w-full">
            <hr />
            <div className="mb-[13px] space-x-[8px] max-w-max">
              <Nav initMenu={2} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * 좋아요 있을 때 보여주는 Component (TODO : 구체화 해줘야함)
   */
  const MyLiked = () => {
    return <div>호이호이</div>;
  };
  return (roomInfo || []).length === 0 ? <NoPostings /> : <MyLiked />;
}

Liked.getLayout = function getLayout(page: React.ReactElement) {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <DefaultLayout title="Liked" handleButtonClick={handleGoBack}>
      {page}
    </DefaultLayout>
  );
};

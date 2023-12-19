/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import NoPosting from '@/public/icons/noPosting.svg';
import Step1 from '@/pages/room/add/step1.tsx';
import useModal from '@/hooks/useModal';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { Nav } from '@/components/index.tsx';
import { getRooms } from '@/api/room';
import { RoomSearch } from '@/public/types/room';
// import { useRouter } from 'next/router';

// TODO 데이터가 구체화되면 바꿔줘야함
interface MyPostingProps {
  roomInfo: any | null;
}

export default function MyPosting({ roomInfo }: MyPostingProps) {
  const { openModal } = useModal();
  const [myRooms, setMyRooms] = useState<RoomSearch[]>([]);
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRooms({ page: 0 });
      setMyRooms((prevRooms) => [...prevRooms, ...(data?.content || [])]);
      console.log('data', data);
    };
    fetchData();
  }, []);

  /**
   *  룸이 없을 때 보여주는 Component
   */
  const NoPostings = () => {
    const noPostingStyle = 'text-[20px] font-bold mt-[29px] text-center';
    const containerStyle = 'flex flex-col items-center justify-start mt-[135px]'; // 'justify-start'로 변경

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
        <div className="fixed bottom-[0px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
          <div className="w-full">
            <hr />
            <div className="mb-[13px] space-x-[8px] max-w-max">
              <Nav />
            </div>
          </div>
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
  return (
    <DefaultLayout title="My postings" handleButtonClick={handleGoBack}>
      {page}
    </DefaultLayout>
  );
};

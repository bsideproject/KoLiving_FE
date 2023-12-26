/* eslint-disable react/no-unstable-nested-components */
import React, { useRef, useEffect, useState } from 'react';
import NoLiked from '@/public/icons/noLiked.svg';
import useModal from '@/hooks/useModal';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { Nav, Typography, Chip, Select } from '@/components/index.tsx';
import { useRouter } from 'next/router';
import { RoomSearch } from '@/public/types/room';
import { getLikedRooms } from '@/api/userInfo';
import FilterImg from '@/public/icons/filter.svg';
import Filter from '@/components/Filter/Filter.tsx';
import isEmpty from 'lodash-es/isEmpty';
import RoomCard from '@/components/RoomCard/RoomCard';
// TODO 데이터가 구체화되면 바꿔줘야함
interface MyPostingProps {
  roomInfo: any | null;
}
const FILTER_LABEL: Record<string, string> = {
  locationIds: 'Location',
  maxDeposit: 'Deposit',
  maxMonthlyRent: 'Monthly rent',
  availableDate: 'Date available',
  types: 'Type of housing',
  furnishingTypes: 'Furnishing',
};

export default function Liked({ roomInfo }: MyPostingProps) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<string[]>([]);
  const [rooms, setRooms] = useState<RoomSearch[]>([]);
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});
  const [totalElements, setTotalElements] = useState(0);
  const target = useRef(null);
  const options = {
    threshold: 1.0,
  };
  const callback = async (entries: IntersectionObserverEntry[]) => {
    const [{ isIntersecting }] = entries;
    if (isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const data = await getLikedRooms(page);
  //       if (data?.error) {
  //         setRooms([]);
  //       } else {
  //         setRooms((prevRooms) => [...prevRooms, ...(data?.content || [])]);
  //         setTotalElements(data?.totalElements || 0);
  //       }
  //     } catch (error) {
  //       setRooms([]);
  //     }
  //   })();
  // }, [page]);

  useEffect(() => {
    (async () => {
      try {
        const result = await getLikedRooms(page);
        if (result?.error) {
          setRooms([]);
        } else {
          setRooms((prevRooms) => [...prevRooms, ...(result?.content || [])]);
          setTotalElements(result?.totalElements || 0);
        }
        // if (target?.current) {
        //   const observer = new IntersectionObserver(callback, options);
        //   observer.observe(target.current);
        // }
      } catch (error) {
        setRooms([]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

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
            onClick={() => router.push('/')}
            type="button"
            data-size="md"
          >
            Look around
          </button>
        </div>
        <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] max-w-max z-20 border-t-[1px] border-g2">
          <div className="w-full">
            <div className="mb-[13px] space-x-[8px] max-w-max">
              <Nav initMenu={2} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const LikedComponent = () => {
    // 옵션 제거 시 실행될 함수
    const [clickedChip, setClickedChip] = useState('');
    const makeFilters = (filterParams: Record<string, string>) => {
      const resultFilter: string[] = [];
      Object.keys(filterParams).forEach((key) => {
        if (!isEmpty(filterParams[key])) {
          resultFilter.push(FILTER_LABEL[key]);
        }
      });
      setFilters(() => [...resultFilter]);
    };
    const getChildData = async (childData: Record<string, string>) => {
      makeFilters(childData);
      setPage(0);
      // setRooms([]);
    };
    const openFilterPopup = () => {
      openModal({
        props: {
          title: 'Filters',
          size: 'full',
          custom: true,
          customHeader: false,
        },
        children: <Filter closeModal={closeModal} getChildData={getChildData} />,
      });
    };
    const handleChipClick = (label: React.SetStateAction<string>) => {
      setClickedChip(label);
    };
    const handleCardClick = (id: number) => {
      router.push(`/room/${id}`);
    };
    const handleOptionRemove = (option: string, index: number) => {
      const resultFilters = filters.filter((item) => item !== option);
      setFilters(() => [...resultFilters]);

      const selectedOption = Object.keys(FILTER_LABEL).find((key) => {
        return FILTER_LABEL[key] === option;
      });
      setPage(0);
      setRooms([]);
      setSearchParams((prev) => {
        return {
          ...prev,
          [selectedOption as string]: '',
        };
      });

      // 선택된 칩이 없거나 클릭된 칩이 삭제된 칩인 경우에 맨 처음 칩을 clickedChip으로 설정
      if ((clickedChip || '') === '') {
        setClickedChip(filters?.[0]);
      }
    };
    const handlePropsClick = (option: string, index: number) => {
      let result = false;
      if ((clickedChip || '') !== '' && filters.length > 1) {
        result = filters[0] === option;
      } else if (filters.length === 1) {
        result = option === filters[0];
      }
      return result;
    };
    return (
      <div>
        <div className="font-semibold pt-[16px]">
          You have liked <span className="text-r1">{totalElements} rooms</span>
        </div>
        {rooms.map((room, idx) => (
          <div className={`mt-[20px] ${rooms.length - 1 === idx ? 'mb-[83px]' : ''}`} key={`room-${idx}`}>
            <RoomCard room={room} onClick={() => handleCardClick(room.id)} isLikedRooms />
          </div>
        ))}

        <div ref={target} />
      </div>
    );
  };
  return (rooms || []).length === 0 ? <NoPostings /> : <LikedComponent />;
}

Liked.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <DefaultLayout type="title" title="Liked" titleCenter>
        {page}
      </DefaultLayout>
      <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] max-w-max z-20 border-t-[1px] border-g2">
        <div className="w-full">
          <div className="mb-[13px] space-x-[8px] max-w-max">
            <Nav />
          </div>
        </div>
      </div>
    </>
  );
};

/* eslint-disable no-restricted-syntax */
import React, { useEffect, useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';
import RoomCard from '@/components/RoomCard/RoomCard';
import { RoomSearch } from '@/public/types/room';
import { NextPage, NextPageContext } from 'next';
import RoomListLayout from '@/components/layouts/RoomListLayout.tsx';
import FilterImg from '@/public/icons/filter.svg';
import Set from '@/public/icons/set.svg';
import { useRouter } from 'next/router';
import { Chip, Typography, Nav } from '@/components/index.tsx';
import useModal from '@/hooks/useModal.ts';
import Filter from '@/components/Filter/Filter.tsx';
import { getRooms } from '@/api/room';
import isEmpty from 'lodash-es/isEmpty';
import { getLikedRooms } from '@/api/userInfo';

type HomeProps = NextPage & {
  getLayout: (page: React.ReactElement, ctx: NextPageContext) => React.ReactNode;
};

const FILTER_LABEL: Record<string, string> = {
  locationIds: 'Location',
  maxDeposit: 'Deposit',
  maxMonthlyRent: 'Monthly rent',
  availableDate: 'Date available',
  types: 'Type of housing',
  furnishingTypes: 'Furnishing',
};

const EXCLUDE_FILTERS = ['locations', 'housingChecked', 'furnishingChecked'];

const defaultFilters = Object.values(FILTER_LABEL).map((value) => {
  return {
    selected: false,
    value,
  };
});

function Home() {
  const [rooms, setRooms] = useState<RoomSearch[]>([]);
  const [filters, setFilters] = useState<{ selected: boolean; value: string }[]>(defaultFilters);
  const [clickedChip, setClickedChip] = useState(-1);
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});
  const [likedRoom, setLikedRoom] = useState([]);
  // TODO: 전체 페이지보다 크면 페이징 처리 안되도록 수정
  // TODO : ModalLayer 로 로그인한 사용자의 Context 생성 필요
  // eslint-disable-next-line consistent-return
  const selectRooms = async () => {
    try {
      const data = await getRooms({
        ...searchParams,
        page,
      });
      setRooms(data?.content || []);
      setTotalElements(data?.totalElements || 0);

      return data?.content;
    } catch (error) {
      console.error(error);
    }
  };

  const formatFilters = (filterParams: Record<string, string>) => {
    let resultFilter = [...defaultFilters];

    Object.keys(filterParams).forEach((key) => {
      if (!isEmpty(filterParams[key])) {
        if (!EXCLUDE_FILTERS.includes(key)) {
          resultFilter = resultFilter.filter((item) => {
            return item.value !== FILTER_LABEL[key];
          });
          resultFilter.unshift({
            selected: true,
            value: FILTER_LABEL[key],
          });
        }
      }
    });

    setFilters(() => [...resultFilter]);
  };

  const target = useRef(null);

  const getChildData = async (childData: Record<string, string>) => {
    formatFilters(childData);
    setPage(0);
    setSearchParams(childData);
    setRooms([]);
  };
  const openFilterPopup = () => {
    openModal({
      props: {
        title: 'Filters',
        size: 'full',
        custom: true,
        customHeader: false,
      },
      children: (
        <Filter closeModal={closeModal} getChildData={getChildData} focus={clickedChip} initialData={searchParams} />
      ),
    });
  };

  const options = {
    threshold: 1.0,
  };

  const callback = async (entries: IntersectionObserverEntry[]) => {
    const [{ isIntersecting }] = entries;
    if (isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRooms({ ...searchParams, page });
      setRooms((prevRooms) => [...prevRooms, ...(data?.content || [])]);
      setTotalElements(data?.totalElements || 0);
    };

    fetchData();
  }, [page, searchParams]);

  // 최초 접근 시 Room 정보 조회
  useEffect(() => {
    (async () => {
      const resultRooms = await selectRooms();
      const resultLikedRooms = (await getLikedRooms(page))?.content;
      const roomIds = [];
      if (resultRooms) {
        for (const room of resultRooms) {
          const roomId = room?.id;
          if (resultLikedRooms && resultLikedRooms.some((_likedRoom) => _likedRoom?.id === roomId)) {
            roomIds.push(roomId);
          }
        }
      }
      // await selectProfile();
      if (target?.current) {
        const observer = new IntersectionObserver(callback, options);
        observer.observe(target.current);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const handleCardClick = (id: number) => {
    router.push(`/room/${id}`);
  };

  // Chip 클릭 했을 때 이벤트
  const handleChipClick = (index: number) => {
    setClickedChip(index);
  };

  useEffect(() => {
    if (clickedChip > -1) {
      openFilterPopup();
      setClickedChip(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedChip]);

  // // 맨 처음 Filter 에서 불러올 때 첫번째 항목이 선택되어 있도록 수정
  // const handlePropsClick = (option: string, index: number) => {
  //   let result = false;
  //   if ((clickedChip || '') !== '' && filters.length > 1) {
  //     result = filters[0] === option;
  //   } else if (filters.length === 1) {
  //     result = option === filters[0];
  //   }
  //   return result;
  // };
  // // 옵션 제거 시 실행될 함수
  const handleOptionRemove = (option: { selected: boolean; value: string }, index: number) => {
    let result = [...filters];
    result = result.filter((item) => item.value !== option.value);
    result.push({
      selected: false,
      value: option.value,
    });

    setFilters(() => [...result]);

    const selectedOption = Object.keys(FILTER_LABEL).find((key) => {
      return FILTER_LABEL[key] === option.value;
    });

    setPage(0);
    setRooms([]);
    setSearchParams((prev) => {
      return {
        ...prev,
        [selectedOption as string]: '',
      };
    });

    // if ((clickedChip || '') === '') {
    //   setFilters(() => [...defaultFilters]);
    // }
  };

  return (
    <>
      <div className="mb-[8px] flex pt-[12px]">
        <div className="mr-[4px]" onClick={openFilterPopup}>
          {/* <FilterImg className="stroke-g7 stroke-[2] cursor-pointer " style={{ alignSelf: 'flex-start' }} /> */}
          <div className="rounded-[2px] border-g3 border-[1px] py-[3px] px-[8px]">
            <Set />
          </div>
        </div>
        <div className="overflow-x-scroll whitespace-nowrap no-scrollbar">
          {filters.map((filter, index) => {
            return (
              <Chip
                key={`${filter.value}-${index}`}
                label={filter.value}
                onlyText={!filter.selected}
                onDelete={() => handleOptionRemove?.(filter, index)}
                onChipClick={() => handleChipClick?.(index)}
                clicked={filter.selected}
              />
            );
          })}
        </div>
      </div>
      <Typography variant="body" customClassName="text-left font-semibold text-[16px] text-g7">
        There are <span className="text-r1">{`${totalElements} rooms`}</span> in total!
      </Typography>
      <div className="mt-[12px] grid grid-flow-row gap-[20px]">
        {rooms.map((room, idx) => (
          // Nav 영역 맨 마지막 부분 잘리는 문제로 추가!!
          <div className={`${rooms.length - 1 === idx ? 'mb-[83px]' : ''}`} key={`room-${idx}`}>
            <RoomCard room={room} onClick={() => handleCardClick(room.id)} />
          </div>
        ))}
      </div>
      <div ref={target} />
      <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] max-w-max z-20 border-t-[1px] border-g2">
        <div className="w-full">
          <div className="mb-[13px] space-x-[8px] max-w-max">
            <Nav />
          </div>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <RoomListLayout>{page}</RoomListLayout>;
};

export default Home as HomeProps;

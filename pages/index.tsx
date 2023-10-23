import React, { useEffect, useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';
import RoomCard from '@/components/RoomCard/RoomCard';
import { RoomSearch } from '@/public/types/room';
import { NextPage, NextPageContext } from 'next';
import RoomListLayout from '@/components/layouts/RoomListLayout.tsx';
import FilterImg from '@/public/icons/filter.svg';
import { useRouter } from 'next/router';
import { Chip, Typography, Nav } from '@/components/index.tsx';
import useModal from '@/hooks/useModal.ts';
import Filter from '@/components/Filter/Filter.tsx';
import { getRooms } from '@/api/room';
import isEmpty from 'lodash-es/isEmpty';
import useUserInfo from '@/hooks/useUserInfo.ts';
import { getProfile } from '@/api/userInfo';
import { UserInfoProps } from '@/context/UserInfoProvider.tsx';

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

function Home() {
  const [rooms, setRooms] = useState<RoomSearch[]>([]);
  const [profile, setProfile] = useState<UserInfoProps>();
  const [filters, setFilters] = useState<string[]>([]);
  const [clickedChip, setClickedChip] = useState('');
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [page, setPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});
  const { setUserInfoData, userInfoState } = useUserInfo();
  // TODO: 전체 페이지보다 크면 페이징 처리 안되도록 수정
  // TODO : ModalLayer 로 로그인한 사용자의 Context 생성 필요
  const selectRooms = async () => {
    try {
      const data = await getRooms({
        ...searchParams,
        page,
      });
      setRooms(data?.content || []);
      setTotalElements(data?.totalElements || 0);
    } catch (error) {
      console.error(error);
    }
  };

  const makeFilters = (filterParams: Record<string, string>) => {
    const resultFilter: string[] = [];
    Object.keys(filterParams).forEach((key) => {
      if (!isEmpty(filterParams[key])) {
        resultFilter.push(FILTER_LABEL[key]);
      }
    });
    setFilters(() => [...resultFilter]);
  };

  const target = useRef(null);

  const getChildData = async (childData: Record<string, string>) => {
    makeFilters(childData);
    setPage(0);
    setSearchParams(childData);
    setRooms([]);
  };
  const selectProfile = async () => {
    try {
      const data = await getProfile();
      if (data != null) {
        setProfile(data);
      }
    } catch (error) {
      console.error(error);
    }
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
    if (!page) {
      return;
    }

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
      await selectRooms();
      await selectProfile();
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
  const handleChipClick = (label: React.SetStateAction<string>) => {
    setClickedChip(label);
  };

  // 맨 처음 Filter 에서 불러올 때 첫번째 항목이 선택되어 있도록 수정
  const handlePropsClick = (option: string, index: number) => {
    let result = false;
    if ((clickedChip || '') !== '' && filters.length > 1) {
      result = filters[0] === option;
    } else if (filters.length === 1) {
      result = option === filters[0];
    }
    return result;
  };
  // 옵션 제거 시 실행될 함수
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

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }} className="mb-[8px]">
        <FilterImg
          className="stroke-g7 stroke-[2] cursor-pointer "
          onClick={openFilterPopup}
          style={{ alignSelf: 'flex-start' }}
        />
        {filters.map((label, index) => {
          return (
            <div style={{ marginLeft: index === 0 ? '4px' : '0', marginRight: '-4px' }} key={index}>
              <Chip
                key={`${label}-${index}`}
                label={label}
                onDelete={() => handleOptionRemove?.(label, index)}
                onChipClick={() => handleChipClick?.(label)}
                clicked={handlePropsClick?.(label, index)}
              />
            </div>
          );
        })}
      </div>
      <Typography variant="body" customClassName="text-left font-bold text-[16px] text-g7">
        There are <span className="text-r1">{`${totalElements} rooms`}</span> in total!
      </Typography>
      {rooms.map((room, idx) => (
        // Nav 영역 맨 마지막 부분 잘리는 문제로 추가!!
        <div className={`mt-[20px] ${rooms.length - 1 === idx ? 'mb-[83px]' : ''}`} key={`room-${idx}`}>
          <RoomCard room={room} onClick={() => handleCardClick(room.id)} />
        </div>
      ))}
      <div ref={target} />
      <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max z-20 border-t-[1px] border-g2">
        <div className="w-full">
          <div className="mb-[13px] space-x-[8px] max-w-max">
            <Nav profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <RoomListLayout>{page}</RoomListLayout>;
};

export default Home as HomeProps;

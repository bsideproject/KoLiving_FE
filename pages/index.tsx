import React, { useEffect, useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';
import RoomCard from '@/components/RoomCard/RoomCard';
import { RoomSearch } from '@/public/types/room';
import { NextPage, NextPageContext } from 'next';
import RoomListLayout from '@/components/layouts/RoomListLayout.tsx';
import FilterImg from '@/public/icons/filter.svg';
import { useRouter } from 'next/router';
import { Chip, Typography, Nav } from '@/components/index.tsx';
import { FilterType } from '@/public/types/filter';
import useModal from '@/hooks/useModal.ts';
import { FieldValues } from 'react-hook-form';
import Filter from '@/components/Filter/Filter.tsx';
import { useTranslation } from 'next-i18next';
import { getRooms } from '@/api/room';

type HomeProps = NextPage & {
  getLayout: (page: React.ReactElement, ctx: NextPageContext) => React.ReactNode;
};

function Home() {
  const commonTranslation = useTranslation('common');
  const [rooms, setRooms] = useState<RoomSearch[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [clickedChip, setClickedChip] = useState('');
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const [page, setPage] = useState(0);

  // TODO: 전체 페이지보다 크면 페이징 처리 안되도록 수정

  const selectRooms = async () => {
    try {
      const data = await getRooms({ page });
      setRooms(data?.content || []);
    } catch (error) {
      console.error(error);
    }
  };

  const makeFilters = (filterParams: FilterType) => {
    const resultFilter: string[] = [];
    Object.keys(filterParams).forEach((key) => {
      // eslint-disable-next-line no-unused-expressions
      filterParams[`${key}`] && resultFilter.push(commonTranslation.t(`${key}`));
    });
    setFilters(() => [...resultFilter]);
  };

  const target = useRef(null);

  const makeSubmitParam = (data: FieldValues): FilterType => {
    const typeOfHousings = ['studioChecked', 'bedFlatsChecked', 'shareHouseChecked'];
    const furnishings = [
      'bedChecked',
      'inductionChecked',
      'airconditionerChecked',
      'stoveChecked',
      'refregeratorChecked',
      'wardrobeChecked',
      'washingMachineChecked',
      'doorLockChecked',
      'tvChecked',
      'kitchenetteChecked',
      'heaterChecked',
    ];

    let typeOfHousing = false;
    let furnishing = false;
    let monthRent = false;
    let deposit = false;
    let location = false;
    let dateAvailable = false;

    // typeOfHousing 중 하나라도 체크되면 true
    typeOfHousings.forEach((key) => {
      if (data[`${key}`]) {
        typeOfHousing = true;
      }
    });

    // furnishing 중 하나라도 체크되면 true
    furnishings.forEach((key) => {
      if (data[`${key}`]) {
        furnishing = true;
      }
    });

    // monthRent 비용 체크
    if ((data[`${'monthMax'}`] || '') !== '' || (data[`${'monthMin'}`] || '') !== '') {
      monthRent = true;
    }

    // deposit 비용 체크
    if ((data[`${'depositMax'}`] || '') !== '' || (data[`${'depositMin'}`] || '') !== '') {
      deposit = true;
    }

    if ((data.gu || '') !== '') {
      location = true;
    }

    if ((data.dateAvailable || '') !== '') {
      dateAvailable = true;
    }
    return { typeOfHousing, furnishing, monthRent, deposit, location, dateAvailable };
  };

  const getChildData = async (childData: any) => {
    const filteredChips = makeSubmitParam(childData);
    makeFilters(filteredChips);
    await selectRooms();
  };

  const openFilterPopup = () => {
    openModal({
      props: {
        title: 'Filters',
        size: 'full',
        custom: true,
        customHeader: false,
      },
      children: <Filter closeModal={closeModal} getChildData={getChildData} roomsLength={(rooms || []).length} />,
    });
  };

  const options = {
    threshold: 1.0,
  };

  const callback = async (entries: IntersectionObserverEntry[]) => {
    const [{ isIntersecting }] = entries;
    // target?.current?.innerText += '관측되었습니다';
    if (isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!page) {
      return;
    }

    const fetchData = async () => {
      const data = await getRooms({ page });
      setRooms((prevRooms) => [...prevRooms, ...(data?.content || [])]);
    };

    fetchData();
  }, [page]);

  // 최초 접근 시 Room 정보 조회
  useEffect(() => {
    (async () => {
      await selectRooms();
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

    // 선택된 칩이 없거나 클릭된 칩이 삭제된 칩인 경우에 맨 처음 칩을 clickedChip으로 설정
    // if ((clickedChip || '' )  === '' ||  selectedOptions.length !== filters.length) {
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
          console.log('label >>', label);
          return (
            <div style={{ marginLeft: index === 0 ? '4px' : '0', marginRight: '-4px' }}>
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
        There are <span className="text-r1">{`${rooms.length} rooms`}</span> in total!
      </Typography>
      {rooms.map((room, idx) => (
        // Nav 영역 맨 마지막 부분 잘리는 문제로 추가!!
        <div className={`mt-[20px] ${rooms.length - 1 === idx ? 'mb-[83px]' : ''}`} key={`room-${idx}`}>
          <RoomCard room={room} onClick={() => handleCardClick(idx)} />
        </div>
      ))}
      <div ref={target} />
      <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
        <div className="w-full">
          <div className="mb-[13px] space-x-[8px] max-w-max">
            <Nav />
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

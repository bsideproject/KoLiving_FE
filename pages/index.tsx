import React, { useEffect, useState } from 'react';
import type { GetStaticPropsContext } from 'next';
import 'tailwindcss/tailwind.css';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RoomCard from '@/components/RoomCard/RoomCard';
import { fetchRooms } from '@/api/room';
import { Room } from '@/public/types/room';
import { NextPage, NextPageContext } from 'next';
import RoomListLayout from '@/components/layouts/RoomListLayout.tsx';
import FilterImg from '@/public/icons/filter.svg';
import { useRouter } from 'next/router';
import { Chip, Typography } from '@/components/index.tsx';
import { FilterType } from '@/public/types/filter';
import Filter from '@/pages/room/filter.tsx';
import useModal from '@/hooks/useModal.ts';
import { FieldValues } from 'react-hook-form';

export const getStaticProps = async ({ locale }: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ['common'])),
  },
});

type HomeProps = NextPage & {
  getLayout: (page: React.ReactElement, ctx: NextPageContext) => React.ReactNode;
};

function Home() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [clickedChip, setClickedChip] = useState('');
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const selectRooms = async () => {
    try {
      const data = await fetchRooms();
      setRooms(data);
    } catch (error) {
      console.error(error);
    }
  };

  const makeFilters = (filterParams: FilterType) => {
    const resultFilter: string[] = [];
    Object.keys(filterParams).forEach((key) => {
      // eslint-disable-next-line no-unused-expressions
      filterParams[`${key}`] === 'true' && resultFilter.push(key);
    });
    setFilters(() => [...resultFilter]);
  };

  const makeSubmitParam = (data: FieldValues) => {
    const typeOfHousings = ['studioChecked', 'bedFlatsChecked', 'shareHouseChecked'];
    const furnishings = [
      'bedChecked',
      'inductionChecked',
      'airconditionerChecked',
      'gasStoveChecked',
      'refrigeratorChecked',
      'wardrobeChecked',
      'washingMachineChecked',
      'doorLockChecked',
      'tvChecked',
      'kitchenetteChecked',
    ];

    let typeOfHousing = 'false';
    let furnishing = 'false';
    let monthRent = 'false';
    let deposit = 'false';
    let location = 'false';
    let dateAvailable = 'false';

    // typeofhousing 중 하나라도 체크되면 true
    typeOfHousings.forEach((key) => {
      if (data[`${key}`] === 'true') {
        typeOfHousing = 'true';
      }
    });

    // furnishing 중 하나라도 체크되면 true
    furnishings.forEach((key) => {
      if (data[`${key}`] === 'true') {
        furnishing = 'true';
      }
    });

    // monthRent 비용 체크
    if ((data[`${'monthMax'}`] || '') !== '' || (data[`${'monthMin'}`] || '') !== '') {
      monthRent = 'true';
    }

    // deposit 비용 체크
    if ((data[`${'depositMax'}`] || '') !== '' || (data[`${'depositMin'}`] || '') !== '') {
      deposit = 'true';
    }

    if ((data.gu || '') !== '') {
      location = 'true';
    }

    if ((data.dateAvailable || '') !== '') {
      dateAvailable = 'true';
    }

    return { typeOfHousing, furnishing, monthRent, deposit, location, dateAvailable };
  };

  const getChildData = async (childData: any) => {
    console.log('childData', childData);
    const filteredChips = makeSubmitParam(childData) as FilterType;
    makeFilters(filteredChips);
    await selectRooms();
  };

  const openFilterPopup = () => {
    openModal({
      props: {
        title: 'Filters',
        size: 'full',
        custom: true,
      },
      children: <Filter closeModal={closeModal} getChildData={getChildData} roomsLength={(rooms || []).length} />,
    });
  };

  // 최초 접근 시 Room 정보 조회
  useEffect(() => {
    (async () => {
      await selectRooms();
      const filterParams: FilterType = router.query as FilterType;
      makeFilters(filterParams);
    })();
  }, [router.query]);

  const handleCardClick = (id: number) => {
    router.push(`/room/${id}`);
  };

  const handleChipClick = (label: React.SetStateAction<string>) => {
    setClickedChip(label);
  };
  const handlePropsClick = (option: string, index: number) => {
    let result = false;
    if ((clickedChip || '') !== '') {
      result = clickedChip === option || selectedOptions.length === 1;
    } else {
      result = index === 0;
    }
    return result;
  };
  // 옵션 제거 시 실행될 함수
  const handleOptionRemove = (option: string, index: number) => {
    setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((item) => item !== option));
    const removedOptions = selectedOptions.filter((item) => item === option);
    // 선택된 칩이 없거나 클릭된 칩이 삭제된 칩인 경우에 맨 처음 칩을 clickedChip으로 설정
    if (selectedOptions.length === 0 || removedOptions.length > 0) {
      setClickedChip(selectedOptions[0] || '');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        <FilterImg
          className="stroke-g7 stroke-[2] cursor-pointer "
          onClick={openFilterPopup}
          style={{ alignSelf: 'flex-start' }}
        />
        {filters.map((label, index) => {
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
      <Typography variant="body" customClassName="text-left font-bold text-[16px] ">
        There are <span className="text-r1">{`${rooms.length} rooms`}</span> in total!
      </Typography>
      {rooms.map((room, idx) => (
        <RoomCard room={room} key={`room-${idx}`} onClick={() => handleCardClick(idx)} />
      ))}
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <RoomListLayout>{page}</RoomListLayout>;
};

export default Home as HomeProps;

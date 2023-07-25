import React, { useEffect } from 'react';
import { Header, Space } from '@/components/index.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { fetchRoom } from '@/api/room';
import { useRouter } from 'next/router';
import { Room } from '@/public/types/room';
import { formatAge, formatDate } from '@/utils/transform';
import ArrowDown from '@/public/icons/arrow-down.svg';
import Pin from '@/public/icons/pin.svg';
import Calendar from '@/public/icons/calendar.svg';
import styles from './room.module.scss';

export default function Login() {
  const router = useRouter();
  const { id } = router.query;

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [room, setRoom] = React.useState<Room | undefined>();
  const age = room ? formatAge(room.userInfo.year) : 0;

  const handleSlideChange = (activeIndex: number) => {
    setCurrentSlide(activeIndex);
  };

  useEffect(() => {
    (async () => {
      if (id && typeof id === 'string') {
        const data = await fetchRoom(id);
        setRoom(data);
      }
    })();
  }, [id]);

  return (
    <div>
      {room && (
        <div className="font-pretendard w-full">
          <Swiper
            effect="coverflow"
            slidesPerView={1}
            loop
            className="mySwiper !mx-[-20px] h-[240px] relative"
            onSlideChangeTransitionEnd={(event) => handleSlideChange(event.realIndex)}
          >
            {room.images.map((image, idx) => (
              <SwiperSlide className={styles['swiper-slide']} key={`room-image-${idx}`}>
                <img src={image} alt={`room-${idx}`} />
              </SwiperSlide>
            ))}
            <div className={styles.tag}>
              {currentSlide + 1}/{room.images.length}
            </div>
          </Swiper>
          <div className="flex py-[20px]">
            <img className="rounded-[40px] w-[40px] h-[40px]" src={room.userInfo.image} alt="user" />
            <div className="ml-[12px]">
              <div className="text-[16px] text-g7 font-semibold">{room.userInfo.name}</div>
              <div className="text-a2 text-[12px]">
                {age} years old
                <span className="text-g3">&nbsp;|&nbsp;</span>
                {room.userInfo.gender}
              </div>
            </div>
            <Space />
            <div className="flex items-center">
              <ArrowDown />
            </div>
          </div>
          <hr />
          <div className="font-pretendard text-[14px] text-g6 py-[20px]">
            <div className="flex items-center">
              <Pin className="mr-[12px]" />
              {room.dong}, {room.gu}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-[12px]" />
              From {formatDate(room.availableDate)}
            </div>
          </div>
          <hr />
        </div>
      )}
    </div>
  );
}

Login.getLayout = function getLayout(page: React.ReactElement) {
  const handleButtonClick = () => {
    window.history.back();
  };

  return (
    <>
      <Header type="back" bgColor="white" handleButtonClick={handleButtonClick} />
      {/* TODO: 기획 시안이 달라서 일단 둔다. 오른쪽에 펜 버튼이 있어야 하면 다시 살리자 */}
      {/* <Header type="back" bgColor="white" handleButtonClick={handleButtonClick} right="pencil" /> */}
      <div className="mx-auto mt-[54px]">{page}</div>
    </>
  );
};

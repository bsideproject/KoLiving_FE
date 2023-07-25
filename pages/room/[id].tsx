import React, { useEffect } from 'react';
import { Header } from '@/components/index.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Swiper as SwiperType } from 'swiper/types';
import { fetchRoom } from '@/api/room';
import { useRouter } from 'next/router';
import { Room } from '@/public/types/room';
import styles from './room.module.scss';

export default function Login() {
  const router = useRouter();
  const { id } = router.query;

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [room, setRoom] = React.useState<Room | undefined>();

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

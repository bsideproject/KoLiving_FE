import React from 'react';
import { Header } from '@/components/index.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './room.module.scss';

export default function Login() {
  return (
    <div className="font-pretendard w-full">
      <Swiper effect="coverflow" slidesPerView={1} loop className="mySwiper !mx-[-20px]">
        <SwiperSlide className={styles['swiper-slide']}>
          <img src="https://picsum.photos/300/300/?image=100" alt="img1" />
        </SwiperSlide>
        <SwiperSlide className={styles['swiper-slide']}>
          <img src="https://picsum.photos/300/300/?image=1" alt="img2" />
        </SwiperSlide>
        태그
      </Swiper>
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

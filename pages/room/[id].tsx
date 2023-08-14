import React, { useEffect } from 'react';
import { Button, Header, Space } from '@/components/index.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { fetchRoom } from '@/api/room';
import { useRouter } from 'next/router';
import { ROOM_TYPE, Room } from '@/public/types/room';
import { formatAge, formatDate, formatPrice } from '@/utils/transform';
import ArrowDown from '@/public/icons/arrow-down.svg';
import Pin from '@/public/icons/pin.svg';
import Calendar from '@/public/icons/calendar.svg';
import HomeBadge from '@/public/icons/home-badge.svg';
import Dot from '@/public/icons/dot.svg';
import ReceiptBadge from '@/public/icons/receipt-badge.svg';
import Badge from '@/components/Badge/Badge';
import Like from '@/public/icons/like.svg';
import MyImageSvg from '@/components/ImageSvg/ImageSvg';
import styles from './room.module.scss';

export default function Login() {
  const router = useRouter();
  const { id } = router.query;

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [room, setRoom] = React.useState<Room | undefined>();
  const age = room ? formatAge(room.userInfo.year) : 0;
  const [isShowDetail, setIsShowDetail] = React.useState(false);

  const handleSlideChange = (activeIndex: number) => {
    setCurrentSlide(activeIndex);
  };

  const roomType = room?.roomType === ROOM_TYPE.ONE_ROOM ? '1bed flats' : '';

  useEffect(() => {
    (async () => {
      if (id && typeof id === 'string') {
        const data = await fetchRoom(id);
        setRoom(data);
      }
    })();
  }, [id]);

  const toggleShowDetail = () => {
    setIsShowDetail((value) => !value);
  };

  return (
    <div>
      {room && (
        <>
          <div className="font-pretendard w-full mb-[71px]">
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
            <div className="flex py-[20px]" onClick={toggleShowDetail}>
              <MyImageSvg imageUrl={room.userInfo.image} />
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
            {isShowDetail && <div className="pb-[20px] text-g6">{room.userInfo.description}</div>}
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
            <div className="py-[20px]">
              <HomeBadge />
              <p className="font-semibold text-g7 pt-[12px]">{roomType}</p>
              <div className="text-g5 text-[14px] flex items-center gap-[6px]">
                {room.bedCount} bedrooms
                <Dot className="fill-g5 stroke-[1.5px]" />
                {room.bathCount} bathrooms
                <Dot className="fill-g5 stroke-[1.5px]" />
                {room.housemateCount} housemates in total
              </div>
            </div>
            <hr />
            <div className="py-[20px]">
              <ReceiptBadge />
              <div className="flex flex-col gap-y-[8px] text-[16px] pt-[12px]">
                <div className="flex">
                  Deposit
                  <Space />
                  <span className="font-semibold">&#8361; {formatPrice(room.deposit)} / month</span>
                </div>
                <div className="flex">
                  Maintenance fee
                  <Space />
                  <span className="font-semibold">
                    &#8361; {room.maintenanceFee ? formatPrice(room.maintenanceFee) : 0} / month
                  </span>
                </div>
              </div>
              <p className="test-[14px] text-a2">Included</p>
              <div className="flex pt-[8px] gap-[4px]">
                {room.maintenanceFeeItems &&
                  room.maintenanceFeeItems.map((item, idx) => <Badge text={item} key={`maintenance-fee-${idx}`} />)}
              </div>
            </div>
            <hr />
            <div className="py-[20px]">
              <p className="text-g7 font-semibold text-[18px]">Furnishing</p>
              <div className="flex pt-[8px] gap-[4px]">
                {room.furnishings &&
                  room.furnishings.map((item, idx) => <Badge text={item} type="flat" key={`furnishing-${idx}`} />)}
              </div>
            </div>
            <hr />
            <div className="py-[20px]">
              <p className="text-g7 font-semibold text-[18px]">About the house</p>
              <div className="flex pt-[8px] text-[16px] text-g5">{room.description}</div>
            </div>
            <div className="py-[20px] flex items-center bg-g1 mx-[-20px]">
              <div className="px-[20px]">
                <span className="text-[14px] text-g6 mr-[8px]">Do you want to report this post?</span>
                <span className="text-[16px] text-r1 underline font-semibold">Report</span>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] max-w-max bg-g0 h-[71px] flex justify-center border-t-[1px] border-g2">
            <div className="flex items-center">
              <Like className="stroke-g7 stroke-[1.5px] m-[8px]" />
              <span className="text-[20px] font-semibold">&#8361; {formatPrice(room.deposit)}&nbsp;</span>
              <span>/ month</span>
              <div className="h-[40px] font-medium text-[14px] ml-[12px]">
                <Button height="40px">Start a chat</Button>
              </div>
            </div>
          </div>
        </>
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

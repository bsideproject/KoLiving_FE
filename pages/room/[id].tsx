/* eslint-disable react/no-danger */
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Input, Header, Textarea, Space, ModalBox } from '@/components/index.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from 'next/router';
import { ContactParams, Furnishing, ROOM_TYPE, ReportParams, ReportReason, RoomSearch } from '@/public/types/room';
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
import { contactRoom, deleteRoom, fetchFurnishings, fetchReportReasons, getRoom, reportRoom } from '@/api/room';
import useModal from '@/hooks/useModal';
import { useSession } from 'next-auth/react';
import { FieldError, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Check2 from '@/public/icons/Check2.svg';
import styles from './room.module.scss';

const REPORT_REASON = ['Not a real place', 'Inappropriate content', 'Incorrect information', 'Suspected scammer'];

const ReportModal = ({ closeModal, reportReasons }: { closeModal: () => void; reportReasons: ReportReason[] }) => {
  const { handleSubmit } = useForm();

  const router = useRouter();
  const { id } = router.query;
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(-1);

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    const params: ReportParams = {
      roomId: id as string,
      reportId: String(selectedButtonIndex),
    };
    await reportRoom(params);
    closeModal();
  };

  const handleButtonClick = (index: number) => {
    setSelectedButtonIndex(index);
  };
  return (
    <>
      <h2>Why are you reporting?</h2>
      <p
        className="text-r1 text-[16px]"
        dangerouslySetInnerHTML={{
          __html: 'This won’t be shared with the reported user',
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[10px] mt-[10px]">
          {reportReasons.map((item) => (
            <Button
              onClick={() => handleButtonClick(item.id)}
              color={selectedButtonIndex === item.id ? 'noBg' : 'outlined'}
              size="lg"
              fontWeight="light"
              key={item.id}
            >
              <div className={`flex items-center justify-between `}>
                <span>{item.desc}</span>
                {selectedButtonIndex === item.id && <Check2 className="ml-auto" />}
              </div>
            </Button>
          ))}
        </div>
        <div className="pt-[12px]">
          <Button size="lg" type="submit" disabled={selectedButtonIndex === -1}>
            Report
          </Button>
        </div>
      </form>
    </>
  );
};

const ContactModal = ({ closeModal }: { closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { id } = router.query;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const params: ContactParams = {
      roomId: id as string,
      contactInfo: data.email,
      message: data.description,
    };

    await contactRoom(params);
    closeModal();
  };
  return (
    <>
      <h2>Do you like this room?</h2>
      <p
        className="text-g5 text-[16px]"
        dangerouslySetInnerHTML={{
          __html: 'Leave your contact info and a message so that the user can reach you back!',
        }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-g7 font-pretendard text-[16px] text-start my-[12px]">Contact info</h3>
        <Input type="email" placeholder="Email" register={register('email')} error={errors.email as FieldError} />
        <div className="text-[14px] text-a1 text-start font-normal pt-[6px]">* Phone number not recommended</div>
        <h3 className="my-[12px] text-start">Message</h3>
        <Textarea placeholder="What do you want to tell the user?" register={register('description')} maxByte={500} />
        <div className="pt-[12px]">
          <Button size="lg" type="submit">
            Send
          </Button>
        </div>
      </form>
    </>
  );
};

export default function RoomDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [room, setRoom] = React.useState<RoomSearch | null>();
  const age = room ? formatAge(room.user.birthDate) : 0;
  const [isShowDetail, setIsShowDetail] = React.useState(false);
  const [contactDisabled, setContactDisabled] = React.useState(false);
  const handleSlideChange = (activeIndex: number) => {
    setCurrentSlide(activeIndex);
  };
  const {
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const roomType = room?.roomInfo.roomType === ROOM_TYPE.ONE_ROOM ? '1bed flats' : '';
  const [reportReasons, setReportReasons] = useState<ReportReason[]>([]);

  const [furnishings, setFurnishings] = useState<Furnishing[]>([]);
  const getReportReasons = async () => {
    try {
      const data = await fetchReportReasons();

      if (!data) {
        return;
      }

      setReportReasons(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFurnishings = async () => {
    try {
      const data = await fetchFurnishings();

      if (!data) {
        return;
      }

      setFurnishings(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getFurnishings();
      await getReportReasons();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getRoom(id as string);

      if (!data) {
        return;
      }

      const roomsFurnishings = data.furnishings.map((furnishing) => {
        const roomFurnishing = furnishings.find((item) => item.id === furnishing.id);

        if (!roomFurnishing) {
          return null;
        }

        return roomFurnishing.desc;
      });

      const dataRoom: RoomSearch = {
        ...data,
        furnishingsData: roomsFurnishings as string[],
      };
      setRoom(dataRoom);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [furnishings]);

  const toggleShowDetail = () => {
    setIsShowDetail((value) => !value);
  };

  const { openModal, closeModal } = useModal();

  const includeServices = useMemo(() => {
    return (
      room?.maintenance &&
      Object.keys(room.maintenance)
        .filter((key) => key.endsWith('Included') && (room.maintenance as Record<string, any>)[key] === true)
        .map((key) => key.replace('Included', ''))
    );
  }, [room?.maintenance]);

  const handleButtonClick = () => {
    window.history.back();
  };

  const removeRoom = async () => {
    if (typeof id === 'string') {
      await deleteRoom(id);
    }
  };

  const session = useSession();
  const email = session?.data?.user?.email;

  const showDeleteModal = () => {
    openModal({
      props: {
        title: 'Delete this post?',
        content: 'You will not be able to restore this post.',
        buttonType: 'both',
        buttonName: 'Cancel',
        buttonName2: 'Delete',
        hasCloseButton: true,
        handleClose: () => {
          closeModal();
        },
        handleSecondButton: async () => {
          await removeRoom();
          router.push('/');
          closeModal();
        },
      },
    });
  };

  const completeContact = () => {
    closeModal();

    openModal({
      props: {
        title: 'Congratulation!',
        content: 'Your message has been sent successfully',
        buttonType: 'default',
        buttonName: 'Keep Exploring',
        handleClose: () => {
          router.push('/');
          closeModal();
        },
        hasCloseButton: true,
      },
    });
  };
  /** Contact  Button Click 시 팝업 오픈 */
  const handleContactPopup = () => {
    openModal({
      props: {
        custom: true,
        customHeader: true,
        hasCloseButton: true,
        hasButton: false,
      },
      children: <ContactModal closeModal={completeContact} />,
    });
  };

  const showReporting = () => {
    openModal({
      props: {
        custom: true,
        customHeader: true,
        hasCloseButton: true,
        hasButton: false,
      },
      children: <ReportModal closeModal={closeModal} reportReasons={reportReasons} />,
    });
  };

  useEffect(() => {
    if (!!errors?.email || !watch('description')) {
      setContactDisabled(true);
    } else {
      setContactDisabled(false);
    }
  }, [watch, errors]);

  return (
    <>
      <Header
        type="back"
        bgColor="white"
        handleButtonClick={handleButtonClick}
        right={email === room?.user.email ? 'delete' : undefined}
        // handleSecondButtonClick={showDeleteModal}
      />
      <div className="mx-auto mt-[54px]">
        {room && (
          <>
            <div className="font-pretendard w-full mb-[71px]">
              {(room.images || []).length > 0 ? (
                <Swiper
                  effect="coverflow"
                  slidesPerView={1}
                  loop
                  className="mySwiper !mx-[-20px] h-[240px] relative"
                  onSlideChangeTransitionEnd={(event) => handleSlideChange(event.realIndex)}
                >
                  {(room.images || []).map((image, idx) => (
                    <SwiperSlide className={styles['swiper-slide']} key={`room-image-${idx}`}>
                      <img src={image.path} alt={`room-${idx}`} />
                    </SwiperSlide>
                  ))}
                  <div className={styles.tag}>
                    {currentSlide + 1}/{(room.images || []).length}
                  </div>
                </Swiper>
              ) : (
                <div
                  className="!mx-[-20px] h-[240px] relative bg-cover"
                  style={{ backgroundImage: `url(/images/thumb.png)` }}
                />
              )}
              <div className="flex py-[20px]" onClick={toggleShowDetail}>
                <MyImageSvg imageUrl={room.user.imageUrl || '/images/thumb.png'} />
                <div className="ml-[12px]">
                  <div className="text-[16px] text-g7 font-semibold">{room.user.firstName}</div>
                  <div className="text-a2 text-[12px]">
                    {age} years old
                    <span className="text-g3">&nbsp;|&nbsp;</span>
                    {room.user.gender}
                  </div>
                </div>
                <Space />
                <div className="flex items-center">
                  <ArrowDown />
                </div>
              </div>
              {isShowDetail && <div className="pb-[20px] text-g6">{room.user.description}</div>}
              <hr />
              <div className="font-pretendard text-[14px] text-g6 py-[20px]">
                <div className="flex items-center">
                  <Pin className="mr-[12px]" />
                  {room.location.name}, {room.location.upperLocation?.name}
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
                  {room.roomInfo.bedrooms} bedrooms
                  <Dot className="fill-g5 stroke-[1.5px]" />
                  {room.roomInfo.bathrooms} bathrooms
                  <Dot className="fill-g5 stroke-[1.5px]" />
                  {room.roomInfo.roommates} housemates in total
                </div>
              </div>
              <hr />
              <div className="py-[20px]">
                <ReceiptBadge />
                <div className="flex flex-col gap-y-[8px] text-[16px] pt-[12px]">
                  <div className="flex">
                    Deposit
                    <Space />
                    <span className="font-semibold">&#8361; {formatPrice(room.deposit.amount)} / month</span>
                  </div>
                  <div className="flex">
                    Maintenance fee
                    <Space />
                    <span className="font-semibold">
                      {room.maintenance.maintenanceFee.amount ? formatPrice(room.maintenance.maintenanceFee.amount) : 0}{' '}
                      / month
                    </span>
                  </div>
                </div>
                <p className="test-[14px] text-a2">Included</p>
                <div className="flex pt-[8px] gap-[4px]">
                  {includeServices &&
                    includeServices.map((item, idx) => <Badge text={item} key={`maintenance-fee-${idx}`} />)}
                </div>
              </div>
              <hr />
              {room.furnishingsData && room.furnishingsData?.length > 0 && (
                <div className="py-[20px]">
                  <p className="text-g7 font-semibold text-[18px]">Furnishing</p>
                  <div className="flex pt-[8px] gap-[4px] whitespace-nowrap overflow-x-auto">
                    {room.furnishingsData.map((item, idx) => (
                      <Badge text={item} type="flat" key={`furnishing-${idx}`} />
                    ))}
                  </div>
                </div>
              )}
              <hr />
              <div className="py-[20px]">
                <p className="text-g7 font-semibold text-[18px]">About the house</p>
                <div className="flex pt-[8px] text-[16px] text-g5">{room.description}</div>
              </div>
              <div className="py-[20px] flex items-center bg-g1 mx-[-20px]">
                <div className="px-[20px]">
                  <span className="text-[14px] text-g6 mr-[8px]">Do you want to report this post?</span>
                  <span className="text-[16px] text-r1 underline font-semibold" onClick={showReporting}>
                    Report
                  </span>
                </div>
              </div>
            </div>
            <div className="fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] max-w-max bg-g0 h-[71px] flex justify-center border-t-[1px] border-g2">
              <div className="flex items-center">
                <Like className="stroke-g7 stroke-[1.5px] m-[8px]" />
                <span className="text-[20px] font-semibold">&#8361; {formatPrice(room.deposit.amount)}&nbsp;</span>
                <span>/ month</span>
                <div className="h-[40px] font-medium text-[14px] ml-[12px]">
                  <Button height="40px" onClick={handleContactPopup}>
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ModalBox, Nav, Textarea } from '@/components/index.tsx';
import EditProfile from '@/pages/userInfo/editProfile';
import MyPosting from '@/public/icons/myPosting.svg';
import ChangePassword from '@/public/icons/Password.svg';
import Logout from '@/public/icons/LogOut.svg';
import Vector from '@/public/icons/Vector 115.svg';
import { useRouter } from 'next/router';
import useModal from '@/hooks/useModal.ts';
import { signOut } from 'next-auth/react';
import { UserInfoProps } from '@/context/UserInfoProvider.tsx';
// import { Profile } from '@/public/types/user';
import { formatAge } from '@/utils/transform';
import UserInfoSvg from '../ImageSvg/UserInfoSvg';

function capitalizeFirstLetter(str?: string) {
  // 빈 문자열 또는 null 또는 undefined인 경우에 대비
  if (!str) {
    return str;
  }

  // 첫 번째 글자만 대문자로 변경 후 나머지는 그대로 둠
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

interface ListItemProps {
  IconComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  text: string;
  route: string;
  index: number;
  onclick?: () => void;
}

interface ProfileCard {
  userInfo: UserInfoProps;
  imageSrc: string;
}

export default function ProfileCard({ imageSrc, userInfo }: ProfileCard) {
  const { register } = useForm({ mode: 'onChange' });
  const [showModal, setShowModal] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const age = formatAge(userInfo?.birthDate || '');
  const router = useRouter();
  const { openModal, closeModal } = useModal();

  const handleRouting = (route: string) => {
    if (route === '/') {
      setShowModal(true);
      return;
    }
    router.push(route);
  };

  const handleProfileEdit = () => {
    openModal({
      props: {
        title: 'Edit profile',
        size: 'full',
        custom: true,
        customHeader: true,
      },
      children: <EditProfile _imageSrc={`${imageSrc}`} userInfo={userInfo} />,
    });
  };

  const handleClick = ({ route, onclick }: { route: string; onclick?: () => void }) => {
    if (onclick) {
      onclick();
      return;
    }

    handleRouting(route);
  };

  const ListItem = ({ IconComponent, text, route, index, onclick }: ListItemProps) => (
    <div
      className="flex justify-between items-center border border-gray-300 p-[10px]"
      onMouseOver={() => {
        setHoveredIndex(index);
      }}
      onMouseOut={() => setHoveredIndex(null)}
      onTouchStart={() => setHoveredIndex(index)}
      onTouchEnd={() => setHoveredIndex(null)}
      onClick={() => handleClick({ route, onclick })}
    >
      <div className="flex items-center h-[35px]">
        <IconComponent className="mr-[16px] w-[24px] h-[24px] stroke-g2 stroke-[1px]" />
        <div className="text-base font-medium text-g6">{text}</div>
      </div>
      {hoveredIndex === index && <Vector />}
    </div>
  );

  const doLogout = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  const handleLogout = () => {
    openModal({
      props: {
        title: 'Log out of Ko-Living?',
        content: 'You can log back in at anytime.',
        buttonType: 'both',
        buttonName: 'Cancel',
        buttonName2: 'Log out',
        handleClose: () => closeModal(),
        handleSecondButton: () => doLogout(),
      },
    });
  };

  const items = [
    { IconComponent: MyPosting, text: 'My postings', route: '/userInfo/myPostings' },
    { IconComponent: ChangePassword, text: 'Change password', route: '/resetPassword/step1' },
    { IconComponent: Logout, text: 'Log out', route: '/', onclick: handleLogout },
  ];

  const ListContainer = () => {
    return (
      <div className="flex flex-col w-full">
        {items.map((item, index) => (
          <ListItem key={index} {...item} index={index} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="w-full h-auto border border-gray-300 flex flex-col bg-r1 text-g0 mt-[50px]">
        <div className="flex w-full">
          <div className="ml-[20px] mt-[20px]">
            <UserInfoSvg imageUrl={imageSrc || '/images/thumb.png'} />
          </div>
          <div className="flex flex-col justify-center pl-5 mt-[31px]">
            <div className="text-[20px] font-semibold">{userInfo?.firstName}</div>
            <div className="text-[14px] font-normal text-opacity-80">
              {age} years old | {capitalizeFirstLetter(userInfo?.gender)}
            </div>
          </div>
          <div className="flex items-center pr-4 ml-auto">
            <button
              className="text-sm text-r5 border border-r5 rounded-full w-[50px] h-[24px]"
              onClick={handleProfileEdit}
            >
              Edit
            </button>
          </div>
        </div>
        <Textarea
          register={register('describe')}
          initValue={userInfo?.description || ''}
          className="bg-r1 mb-[20px] h-[120px] text-[14px]"
          readonly
        />
      </div>
      <ListContainer />
      <hr className="mt-[345px]" />
      <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
        <div className="w-full">
          <div className="mb-[13px] space-x-[8px] max-w-max">
            <Nav />
          </div>
        </div>
      </div>
    </>
  );
}

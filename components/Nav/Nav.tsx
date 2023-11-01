/* eslint-disable no-self-compare */
import React, { useState } from 'react';
import Like from '@/public/icons/like.svg';
import Home from '@/public/icons/home.svg';
import Me from '@/public/icons/me.svg';
import HugeIcon from '@/public/icons/huge-icon.svg';
import { useRouter } from 'next/router';
import { UserInfoProps } from '@/context/UserInfoProvider.tsx';
import styles from './Nav.module.scss';

const defaultStrokeColor = 'stroke-g4 stroke-[1.5px]';
const activeStrokeColor = 'stroke-r1 stroke-[1.5px]';

interface NavProps {
  initMenu?: number;
  profile?: UserInfoProps;
}
const menus = [
  {
    name: 'Rooms',
    icon: Home,
    router: '/',
  },
  {
    name: 'Notice',
    icon: HugeIcon,
    router: '/notice',
  },
  {
    name: 'Liked',
    icon: Like,
    router: '/liked',
  },
  {
    name: 'My',
    icon: Me,
    router: '/userInfo',
  },
];

export default function Nav({ initMenu, profile }: NavProps) {
  // const { setUserInfoData, userInfoState } = useUserInfo();
  const [hoverMenu, setHoverMenu] = useState(-1); // 초기화
  const router = useRouter();
  const handleNavClicked = (index: number) => {
    if (menus[index].router || '' !== '') {
      router.push(
        {
          pathname: menus[index].router,
          query: { data: profile && JSON.stringify(profile) },
        },
        `${menus[index].router}`
      );
    }
  };

  return (
    <div className={`${styles.container} grid grid-cols-4 bg-g0 w-full h-[66px] text-center relative`}>
      {menus.map((menu, index) => {
        const IconComponent = menu.icon;

        return (
          <div
            className="my-[9px] align-middle items-center cursor-pointer"
            key={menu.name}
            onClick={() => handleNavClicked(index)}
            onMouseEnter={() => setHoverMenu(index)}
            onMouseLeave={() => setHoverMenu(-1)}
          >
            <div className="grid justify-center">
              <div className="relative">
                <IconComponent
                  className={`${menu.router === router.pathname ? activeStrokeColor : defaultStrokeColor} ${
                    hoverMenu === index ? 'cursor-pointer' : ''
                  }`}
                />
                <div className="w-[15px] h-[15px] bg-r1 absolute top-0 left-[20px] rounded-[20px]" />
              </div>
            </div>
            <div className={styles[`${menu.router === router.pathname ? 'nav-activeText' : 'nav-text'}`]}>
              {menu.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}

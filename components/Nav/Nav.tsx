import React, { useState } from 'react';
import Like from '@/public/icons/like.svg';
import Home from '@/public/icons/home.svg';
import Me from '@/public/icons/me.svg';
import { useRouter } from 'next/router';
import styles from './Nav.module.scss';

const defaultStrokeColor = 'stroke-g4 stroke-[1.5px]';
const activeStrokeColor = 'stroke-r1 stroke-[1.5px]';

interface NavProps {
  initMenu?: number;
}

const menus = [
  {
    name: 'Rooms',
    icon: Home,
    router: '/',
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

export default function Nav({ initMenu }: NavProps) {
  const [hoverMenu, setHoverMenu] = useState(-1); // 초기화
  const router = useRouter();

  const handleNavClicked = (index: number) => {
    router.push(menus[index].router);
  };

  return (
    <div className={`${styles.container} grid grid-cols-${menus.length} bg-g0 w-full h-[66px] text-center`}>
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
              <IconComponent
                className={`${menu.router === router.pathname ? activeStrokeColor : defaultStrokeColor} ${
                  hoverMenu === index ? 'cursor-pointer' : ''
                }`}
              />
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

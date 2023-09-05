import React, { useState } from 'react';
import Like from '@/public/icons/like.svg';
import Home from '@/public/icons/home.svg';
import Chat from '@/public/icons/chat.svg';
import Me from '@/public/icons/me.svg';
import styles from './Nav.module.scss';

const defaultStrokeColor = 'stroke-g4 stroke-[1.5px]';
const activeStrokeColor = 'stroke-r1 stroke-[1.5px]';

const menus = [
  {
    name: 'Rooms',
    icon: Home,
  },
  {
    name: 'Chat',
    icon: Chat,
  },
  {
    name: 'Liked',
    icon: Like,
  },
  {
    name: 'My',
    icon: Me,
  },
];

export default function Nav() {
  const [activeMenu, setActiveMenu] = useState(0); // 초기 활성 메뉴 인덱스
  const [hoverMenu, setHoverMenu] = useState(-1); // 초기화

  return (
    <div className={`${styles.container} grid grid-cols-4 bg-g0 w-full h-[66px] text-center`}>
      {menus.map((menu, index) => {
        const IconComponent = menu.icon;

        return (
          <div
            className="my-[9px] align-middle items-center cursor-pointer"
            key={menu.name}
            onClick={() => setActiveMenu(index)}
            onMouseEnter={() => setHoverMenu(index)}
            onMouseLeave={() => setHoverMenu(-1)}
          >
            <div className="grid justify-center">
              <IconComponent
                className={`${index === activeMenu ? activeStrokeColor : defaultStrokeColor} ${
                  hoverMenu === index ? 'cursor-pointer' : ''
                }`}
              />
            </div>
            <div className={styles[`${index === activeMenu ? 'nav-activeText' : 'nav-text'}`]}>{menu.name}</div>
          </div>
        );
      })}
    </div>
  );
}

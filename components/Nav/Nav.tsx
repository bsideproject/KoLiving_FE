import React from 'react';
import Like from '@/public/icons/like.svg';
import Home from '@/public/icons/home.svg';
import Me from '@/public/icons/me.svg';
import styles from './Nav.module.scss';

const menus = [
  {
    name: 'Rooms',
    icon: () => <Home className="stroke-g7 stroke-[1.5px]" />,
  },
  {
    name: 'Chat',
    // TODO: chat 아이콘 받으면 변경 필요
    icon: () => <Like className="stroke-g7 stroke-[1.5px]" />,
  },
  {
    name: 'Liked',
    icon: () => <Like className="stroke-g7 stroke-[1.5px]" />,
  },
  {
    name: 'My',
    icon: () => <Me className="stroke-g7 stroke-[1.5px]" />,
  },
];

export default function Nav() {
  return (
    <div className={`${styles.container} grid grid-cols-4 fixed bottom-0 bg-g0 w-full h-[66px] text-center`}>
      {menus.map((menu) => (
        <div className="my-[9px] align-middle items-center" key={menu.name}>
          <div className="grid justify-center">{menu.icon()}</div>
          <div className={styles['nav-text']}>{menu.name}</div>
        </div>
      ))}
    </div>
  );
}

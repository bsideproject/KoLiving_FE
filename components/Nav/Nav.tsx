import React from 'react';
import styles from './Nav.module.scss';
import CustomImage from '../Image/CustomImage';

const menus = [
  {
    name: 'Rooms',
    icon: '/icons/home.png',
  },
  {
    name: 'Chat',
    // TODO: chat 아이콘 받으면 변경 필요
    icon: '/icons/like.png',
  },
  {
    name: 'Liked',
    icon: '/icons/like.png',
  },
  {
    name: 'My',
    icon: '/icons/me.png',
  },
];

export default function Nav() {
  return (
    <div className="grid grid-cols-4 fixed bottom-0 bg-g0 w-full h-[66px] text-center ">
      {menus.map((menu) => (
        <div className="my-[9px] align-middle items-center" key={menu.name}>
          <div className="grid justify-center">
            <img src={menu.icon} alt={menu.name} width={25} height={25} />
          </div>
          <div className={styles['nav-text']}>{menu.name}</div>
        </div>
      ))}
    </div>
  );
}

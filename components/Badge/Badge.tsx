import React from 'react';

interface BadgeProps {
  text: string;
  type?: 'basic' | 'flat';
}

const badgeStyle = {
  basic: 'border-[1px] border-g2 text-g5',
  flat: 'bg-g1 text-g5',
};

function Badge({ text, type = 'basic' }: BadgeProps) {
  return <div className={`rounded-[2px] w-fit text-[14px] px-[12px] py-[6px] ${badgeStyle[type]}`}>{text}</div>;
}

export default Badge;

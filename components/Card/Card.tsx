import React, { ReactNode } from 'react';

interface CardProps {
  title?: JSX.Element;
  content?: ReactNode;
  footer?: ReactNode;
  onClick?: () => void;
}

export default function Card({ title, content, footer, onClick }: CardProps) {
  return (
    <div className="w-full border-g3 rounded-[4px] border-[1px]">
      {title && (
        <div className="py-[8px] px-[12px] cursor-pointer" onClick={onClick}>
          {title}
        </div>
      )}
      {content && (
        <div className="cursor-pointer" onClick={onClick}>
          {content}
        </div>
      )}
      {footer && <div className="px-[18px]">{footer}</div>}
    </div>
  );
}

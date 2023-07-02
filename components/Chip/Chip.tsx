import React, { useState, useEffect, useMemo, MouseEvent } from 'react';
import Close from '@/public/icons/close.svg';
import Typography from '@/components/Typography/Typography.tsx';

interface ChipProps {
  label: string;
  onDelete?: () => void;
  clicked: boolean;
}

/** Chip Component 1차 개발 */
export default function Chip({ label, onDelete, clicked }: ChipProps) {
  const [isClicked, setIsClicked] = useState(clicked);

  const fillStroke = useMemo(() => {
    return isClicked ? 'stroke-r1 stroke-[2]' : '';
  }, [isClicked]);

  useEffect(() => {
    setIsClicked(isClicked);
  }, [isClicked]);

  const handleDelete = (e: MouseEvent) => {
    e.preventDefault();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="inline-flex items-center bg-r1 bg-opacity-10 text-r1 px-3 py-1 text-base font-semibold mr-2 mb-2">
      <Typography variant="label" fontStyle="semiBold" font="pretendard" color="r1">
        {label}
      </Typography>
      {onDelete && (
        <button className={`"ml-2 focus:outline-none ${fillStroke}`} onClick={handleDelete} aria-label="Delete">
          <Close />
        </button>
      )}
    </div>
  );
}

Chip.defaultProps = {
  onDelete: () => '',
};

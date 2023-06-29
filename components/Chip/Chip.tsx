import React, { MouseEvent } from 'react';
import Close from '@/public/icons/close.svg';
import Typography from '@/components/Typography/Typography.tsx';

interface ChipProps {
  label: string;
  onDelete?: () => void;
}

/** Node Version 문제로 다시 올려봅니다람쥐... */
export default function Chip({ label, onDelete }: ChipProps) {
  const handleDelete = (event: MouseEvent) => {
    event.preventDefault();
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div className="inline-flex items-center bg-r1 bg-opacity-10 text-r1 px-3 py-1 text-sm font-semibold mr-2 mb-2">
      <Typography variant="label" fontStyle="semiBold" font="pretendard" color="r1">
        {label}
      </Typography>
      {onDelete && (
        <button className="ml-2 focus:outline-none" onClick={handleDelete} aria-label="Delete">
          <Close />
        </button>
      )}
    </div>
  );
}

Chip.defaultProps = {
  label: '',
  onDelete: console.log(),
};

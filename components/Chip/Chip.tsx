import React, { useEffect, useState, MouseEvent } from 'react';
import Close from '@/public/icons/close.svg';
import Typography from '@/components/Typography/Typography.tsx';

interface ChipProps {
  label: string;
  onDelete?: () => void;
  clicked?: boolean;
  onChipClick?: (label: string) => void;
}

/** Chip Component 1차 개발 */
export default function Chip({ label, onDelete, clicked, onChipClick }: ChipProps) {
  const [fillStroke, setFillStroke] = useState('');
  const [fillText, setFillText] = useState('');
  useEffect(() => {
    setFillStroke(clicked ? 'stroke-r1 stroke-[2]' : '');
    setFillText(clicked ? 'bg-r1 text-r1' : 'bg-g3 text-g5');
  }, [clicked]);

  const handleDelete = (e: MouseEvent) => {
    e.preventDefault();
    if (onDelete) {
      onDelete();
    }
  };

  const onDivClick = () => {
    onChipClick?.(label);
  };

  return (
    <div
      className={`inline-flex items-center mr-2 mb-2 bg-opacity-10 px-3 py-1 text-base font-semibold ${fillText}`}
      onClick={onDivClick}
    >
      <Typography variant="label" fontStyle="semiBold" font="pretendard" color={clicked ? 'r1' : 'g5'}>
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

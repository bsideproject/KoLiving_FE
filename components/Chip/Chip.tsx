import React, { useEffect, useState, MouseEvent } from 'react';
import Close from '@/public/icons/close.svg';
import Typography from '@/components/Typography/Typography.tsx';

interface ChipProps {
  label: string;
  onDelete?: () => void;
  clicked?: boolean;
  onChipClick?: (label: string) => void;
  onlyText?: boolean;
  fontWeight?: string;
}

/** Chip Component 1차 개발 */
export default function Chip({ label, onDelete, clicked, onChipClick, onlyText, fontWeight }: ChipProps) {
  const [fillStroke, setFillStroke] = useState('');
  const [fillText, setFillText] = useState('');
  useEffect(() => {
    setFillStroke(clicked ? 'stroke-r1 stroke-[2]' : '');
    setFillText(clicked ? 'bg-r1 text-r1' : 'bg-g3 text-g5');
  }, [clicked]);

  const handleDelete = (e: MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    }
  };

  const onDivClick = () => {
    onChipClick?.(label);
  };

  return (
    <div
      className={`pl-[12px] pr-[3.75px] inline-flex items-center mr-2 bg-opacity-10 py-1 font-semibold ${fillText} ${
        onlyText ? 'border-g3 border-[1px] rounded-[2px] !pr-[12px]' : ''
      } ${fontWeight ? `font-[${fontWeight}]` : ''}`}
      onClick={onDivClick}
    >
      <Typography variant="label" fontStyle="medium" font="pretendard" color={clicked ? 'r1' : 'g5'}>
        {label}
      </Typography>
      {!onlyText && (
        <button className="focus:outline-none" onClick={handleDelete} aria-label="Delete">
          <Close width={10.5} height={10.5} className="m-[7px] stroke-r1 stroke-[2] z-20" />
        </button>
      )}
    </div>
  );
}

Chip.defaultProps = {
  onDelete: () => '',
};

import { Room } from '@/public/types/room';
import React, { ReactNode } from 'react';
import Card from '../Card/Card';

interface CardProps {
  room?: Room;
}

export default function RoomCard({ room }: CardProps) {
  return <Card title="여기" />;
}

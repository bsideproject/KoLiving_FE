import {
  ContactParams,
  Furnishing,
  ReportParams,
  ReportReason,
  Room,
  RoomFile,
  RoomSearch,
  RoomSearchParams,
} from '@/public/types/room';
import { fetchData } from './index';

export const fetchFurnishings = async () => {
  return fetchData<Furnishing[]>('/api/v1/furnishings');
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return fetchData<RoomFile>('/api/v1/files', {
    method: 'POST',
    body: formData,
  });
};

export const postRoom = async (room: Room) => {
  return fetchData<Room>('/api/v1/rooms', {
    method: 'POST',
    body: JSON.stringify(room),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getRooms = async (searchParams: RoomSearchParams) => {
  const params = new URLSearchParams(searchParams as Record<string, string>).toString();

  return fetchData<ReturnData<RoomSearch[]>>(`/api/v1/rooms/search?${params}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getRoom = async (id: string) => {
  return fetchData<RoomSearch>(`/api/v1/rooms/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const deleteRoom = async (id: string) => {
  return fetchData<RoomSearch>(`/api/v1/rooms/${id}?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const contactRoom = async (params: ContactParams) => {
  return fetchData<Room>(`/api/v1/rooms/${params.roomId}/contact`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const fetchReportReasons = async () => {
  return fetchData<ReportReason[]>('/api/v1/report/reasons');
};

export const reportRoom = async (params: ReportParams) => {
  return fetchData<Room>(`/api/v1/report/reasons`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

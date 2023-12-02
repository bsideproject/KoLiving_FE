export const NOTIFICATION_TYPE = {
  SEND: 'SEND',
  RECEIVE: 'RECEIVE',
} as const;

export interface Notification {
  type: keyof typeof NOTIFICATION_TYPE;
  id: number;
  userName: string;
  imageProfile: string;
  createdAt: string;
  confirm: boolean;
}

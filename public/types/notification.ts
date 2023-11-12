export const NOTIFICATION_TYPE = {
  SEND: 'SEND',
  RECEIVE: 'RECEIVE',
} as const;

export interface Notification {
  type: keyof typeof NOTIFICATION_TYPE;
  userName: 'string';
  createdAt: '2023-11-12T09:17:25.644Z';
}

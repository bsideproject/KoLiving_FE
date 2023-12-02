import { getNotifications, updateNotification } from '@/api/notification';
import { Button, Chip, Nav } from '@/components';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import React, { useEffect } from 'react';
import Send from '@/public/icons/send.svg';
import Dot from '@/public/icons/dot.svg';
import { Notification } from '@/public/types/notification';
import { formatDateForNotification } from '@/utils/transform';
import NoLiked from '@/public/icons/noLiked.svg';
import { useRouter } from 'next/router';
import useNotification from '@/hooks/useNotification';

const FILTERS = ['All', 'Send', 'Recieved'];

interface filterProps {
  selectedFilter?: string;
  label: string;
  onClick?: () => void;
}

const Filter = ({ selectedFilter, label, onClick }: filterProps) => {
  const styleBySelected = selectedFilter === label ? 'bg-r1 text-g0 border-r1' : 'border-g3 text-g5 bg-g0';

  return (
    <div
      className={`flex h-[32px] px-[16px] py-[6px] justify-center items-center border border-solid rounded-[200px] text-[14px] ${styleBySelected}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

function Notice() {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [selectedFilter, setSelectedFilter] = React.useState<string>('All');
  const { setNewNotifications, newNotifications } = useNotification();

  const updateNewNotifications = () => {
    const updatePromises = newNotifications.map(async (notification) => {
      const result = await updateNotification(notification.id);
      return result;
    });
    setNewNotifications([]);

    return Promise.all(updatePromises);
  };

  const fetchData = async () => {
    const data = await getNotifications();

    if (!data) {
      return;
    }

    setNotifications(data);
  };

  useEffect(() => {
    fetchData();
    updateNewNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const lookAround = () => {
    router.push('/');
  };

  return (
    <div>
      <div className="flex flex-row gap-[8px] pt-[12px]">
        {FILTERS.map((filter, index) => (
          <div key={index}>
            <Filter label={filter} selectedFilter={selectedFilter} onClick={() => setSelectedFilter(filter)} />
          </div>
        ))}
      </div>
      {notifications.length === 0 && (
        <div className="flex flex-col items-center text-center mt-[154px]">
          <div className="w-fit">
            <NoLiked />
          </div>
          <div className="text-g7 font-semibold text-[20px]">You don’t have notifications</div>
          <div className="text-g5 text-[16px]">
            There aren’t any notifications yet.
            <br />
            Find places that you like!
          </div>

          <div className="pt-[22px]">
            <Button color="noBg" onClick={lookAround} size="lg">
              Look around
            </Button>
          </div>
        </div>
      )}
      {notifications.length > 0 && (
        <>
          <div className="text-[16px] font-normal p-[10px]">
            Notifications will be automatically deleted after <span className="font-bold text-r1">30days</span>
          </div>
          <hr />
          {notifications.map((notification, index) => {
            return (
              <div key={index}>
                <div className="p-[10px] flex flex-col gap-[6px]">
                  <div className="flex items-center">
                    <Send className="mr-[6px]" />
                    <div className="font-bold text-r1 text-[10px]">
                      {notification.type === 'SEND' ? 'Message sent' : 'Message recieved'}
                    </div>
                    <Dot className="fill-black stroke-[5px] mx-[6px]" />
                    <div className="font-light text-[10px] text-g4">
                      {formatDateForNotification(notification.createdAt)}
                    </div>
                  </div>
                  <div className="font-bold text-[14px]">{notification.userName}</div>
                  <div className="text-[14px] text-g5">
                    {notification.type === 'SEND'
                      ? 'Your message has been sent successfully.'
                      : 'You have recieved a message. Check your e-mail.'}
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

Notice.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <DefaultLayout type="title" title="Notificatioin" titleCenter>
        {page}
      </DefaultLayout>
      <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max z-20 border-t-[1px] border-g2">
        <div className="w-full">
          <div className="mb-[13px] space-x-[8px] max-w-max">
            <Nav />
          </div>
        </div>
      </div>
    </>
  );
};

export default Notice;

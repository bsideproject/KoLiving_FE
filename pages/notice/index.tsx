import { getNotifications, updateNotification } from '@/api/notification';
import { Button, Nav, Space } from '@/components';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import React, { useEffect } from 'react';
import Send from '@/public/icons/send.svg';
import { Notification } from '@/public/types/notification';
import { formatDateForNotification } from '@/utils/transform';
import NoLiked from '@/public/icons/noLiked.svg';
import { useRouter } from 'next/router';
import useNotification from '@/hooks/useNotification';
import Reply from '@/public/icons/reply.svg';
import NoticeIcon from '@/public/icons/notice.svg';

const FILTERS_MAP = [
  {
    label: 'All',
    type: 'ALL',
  },
  {
    label: 'Send',
    type: 'SEND',
  },
  {
    label: 'Recieved',
    type: 'RECEIVE',
  },
];

const FILTERS = FILTERS_MAP.map((filter) => filter.label);

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
  const [selectedFilter, setSelectedFilter] = React.useState<Record<string, string>>({
    label: 'All',
    type: 'ALL',
  });
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
    const data = await getNotifications(selectedFilter.type);

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

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  return (
    <div>
      <div className="!mx-[-20px] px-[20px] py-[8px] bg-g1">
        <div className="flex flex-row gap-[8px] text-[14px] text-g5">
          <div className="pt-[2px]">
            <NoticeIcon />
          </div>
          <div>
            Notifications will be automatically deleted after <span className="font-bold">30days</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-[8px] pt-[12px]">
        {FILTERS_MAP.map((filter, index) => (
          <div key={index}>
            <Filter
              label={filter.label}
              selectedFilter={selectedFilter.label}
              onClick={() => setSelectedFilter(filter)}
            />
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
        <div className="!mx-[-20px] mt-[12px]">
          {notifications.map((notification, index) => {
            return (
              <div key={index}>
                <div className="flex">
                  <div className="w-[68px] h-[68px]">
                    <div className="py-[10px] px-[18px]">
                      <img
                        className="object-cover object-center w-[32px] h-[32px] rounded-[32px]"
                        src={notification.imageProfile}
                        alt="user"
                      />
                    </div>
                    {notification.type === 'SEND' && (
                      <div className="flex h-[16px] px-[10px] justify-center bg-r1 bg-opacity-10">
                        <Send />
                        <span className="ml-[2px] text-r1 text-[10px]">Sent</span>
                      </div>
                    )}
                    {notification.type === 'RECEIVE' && (
                      <div className="flex h-[16px] justify-center bg-r1">
                        <span className="ml-[2px] text-g0 text-[10px]">Received</span>
                        <Reply />
                      </div>
                    )}
                  </div>
                  <div className="p-[10px] flex flex-col gap-[6px]" style={{ width: 'calc(100% - 68px)' }}>
                    <div className="flex items-center">
                      <div className="font-semibold text-[16px]">{notification.userName}</div>
                      <Space />
                      <div className="font-light text-[10px] text-g4 pr-[10px]">
                        {formatDateForNotification(notification.createdAt)}
                      </div>
                    </div>
                    <div className="text-[12px] text-g5">
                      {notification.type === 'SEND'
                        ? 'Your message has been sent successfully.'
                        : 'You have recieved a message. Check your e-mail.'}
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      )}
      <div className="h-[80px]" />
    </div>
  );
}

Notice.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <DefaultLayout type="title" title="Noti" titleCenter>
        {page}
      </DefaultLayout>
      <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] max-w-max z-20 border-t-[1px] border-g2">
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

import React from 'react';
import { Nav, ProfileCard } from '@/components/index.tsx';
import { useRouter } from 'next/router';
import { formatAge, formatDate, formatPrice } from '@/utils/transform';

interface UserProfileProps {
  imgSrc: string;
}

export default function UserProfile({ imgSrc }: UserProfileProps) {
  const router = useRouter();
  const { query } = router;
  const userInfo = query.data ? JSON.parse(query.data as string) : {};
  const age = formatAge(userInfo.birthDate);
  return (
    <>
      <ProfileCard age={age} name={userInfo.firstName} gender={userInfo.gender} imageSrc={userInfo.image || imgSrc} userInfo={userInfo} />
      <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max border-t-[1px] border-g2">
        <div className="w-full">
          <div className="mb-[13px] space-x-[8px] max-w-max">
            <Nav initMenu={3} />
          </div>
        </div>
      </div>
    </>
  );
}

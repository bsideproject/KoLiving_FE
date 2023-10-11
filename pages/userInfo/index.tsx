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
  const age = formatAge(userInfo.year);
  return (
    <>
      <ProfileCard age={age} name={userInfo.name} gender={userInfo.gender} imageSrc={userInfo.image || imgSrc} />
      <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
        <div className="w-full">
          <div className="mb-[13px] space-x-[8px] max-w-max">
            <Nav initMenu={3} />
          </div>
        </div>
      </div>
    </>
  );
}

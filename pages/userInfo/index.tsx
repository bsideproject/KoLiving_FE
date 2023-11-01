import React, { useState, useEffect } from 'react';
import { Nav, ProfileCard } from '@/components/index.tsx';
import { getProfile } from '@/api/userInfo';
import { UserInfoProps } from '@/context/UserInfoProvider.tsx';

interface UserProfileProps {
  imgSrc: string;
}

export default function UserProfile({ imgSrc }: UserProfileProps) {
  const [profile, setProfile] = useState<UserInfoProps>();
  const selectProfile = async () => {
    try {
      const data = await getProfile();
      if (data != null) {
        setProfile(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      await selectProfile();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {profile && <ProfileCard imageSrc={profile?.imageFile?.path || imgSrc} userInfo={profile} />}
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

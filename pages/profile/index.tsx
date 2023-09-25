import React from 'react';
import { Nav, ProfileCard } from '@/components/index.tsx';

export default function UserProfile() {
    return (
        <>
           <ProfileCard  age={22} name={'James'} gender='Male' imageSrc='https://picsum.photos/700/700/?image=10' />
            <div className="mt-[83px] fixed bottom-[-15px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
                <div className="w-full">
                    <div className="mb-[13px] space-x-[8px] max-w-max">
                        <Nav initMenu={3}/>
                    </div>
                </div>
            </div>
        </>
    )
};

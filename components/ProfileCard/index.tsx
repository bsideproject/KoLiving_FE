import React from 'react';
import { Textarea } from '@/components/index.tsx';
import { useForm } from 'react-hook-form';

interface ProfileCardProps {
    name : string;
    age: number;
    gender : 'Male' | 'Female';
    imageSrc : string;
}

export default function ProfileCard({ name, age, gender, imageSrc }: ProfileCardProps) {
    const { register } = useForm({ mode: 'onChange' });

    return (
        <div className="w-full h-auto border border-gray-300 flex flex-col bg-r1 text-g0">  {/* flex-direction 변경 */}
            <div className="flex w-full">
                <div className="ml-[20px] w-[52px] h-[72px] flex items-center justify-center mt-[20px]">
                    <img src={imageSrc} alt={`${name}'s profile`} />
                </div>
                <div className="flex flex-col justify-center pl-5 h-[72px] mt-[17px]">
                    <div className="text-lg font-bold">{name}</div>
                    <div className="text-base">{age} years old | {gender}</div>
                </div>
                <div className="ml-auto flex items-center pr-4 mb-[132px]">
                    <button className="text-sm text-r5 border border-r5 rounded-full w-[50px] h-[24px]">Edit</button>
                </div>
            </div>
            <Textarea 
                register={ register('describe') } 
                initValue={"Hi, I'm Dennis. I'm 31 years old and I'm from Seoul, South Korea. I'm a software engineer with 5 years of experience in the industry. I'm passionate about building innovative products that make people's lives easier."}
                className="bg-r1 mb-[20px] h-[110px] text-[14px]"
                readonly={true}
            />
        </div>
  );
}

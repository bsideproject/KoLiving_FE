import React, { useState } from 'react';
import { Textarea } from '@/components/index.tsx';
import { useForm } from 'react-hook-form';
import MyPosting from '@/public/icons/myPosting.svg';
import ChangePassword from '@/public/icons/Password.svg';
import Logout from '@/public/icons/LogOut.svg';
import Vector from '@/public/icons/Vector 115.svg';
import { useRouter } from 'next/router';

interface ProfileCardProps {
    name : string;
    age: number;
    gender : 'Male' | 'Female';
    imageSrc : string;
};

interface ListItemProps {
    IconComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    text: string;
    route: string;
    index: number;
};



export default function ProfileCard({ name, age, gender, imageSrc }: ProfileCardProps) {
    const { register } = useForm({ mode: 'onChange' });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const router = useRouter();

    const handleRouting = (route: string) => {
        router.push(route);
    }

    const ListItem = ({ IconComponent, text, route, index }: ListItemProps) => (
        <div 
            className="flex justify-between items-center mb-[10px] border border-gray-300 p-[10px] h-[56px]"
            onMouseOver ={() => { console.log('mouseover', index); setHoveredIndex(index)} }
            onMouseOut={() => setHoveredIndex(null)}
        >
            <div className="flex items-center">
                <IconComponent className="mr-[10px] w-[24px] h-[24px]" onClick={() => handleRouting(route)}/>
                <div className="text-base">{text}</div>
            </div>
            { hoveredIndex === index && <Vector /> }
        </div>
    );
    
    const items = [
        { IconComponent: MyPosting, text: "My postings", route: '/myPosting'},
        { IconComponent: ChangePassword, text: "Change password", route: '/resetPassword/step1'},
        { IconComponent: Logout, text: "Log out", route: "/"},
    ];
    
    const ListContainer = () => (
        <div className="flex flex-col mt-[20px] h-[56px] w-full">
            {items.map((item, index) => (
                <ListItem key={index} {...item} index={index} />
            ))}
        </div>
    );
   
    return (
        <>
            <div className="w-full h-auto border border-gray-300 flex flex-col bg-r1 text-g0 mt-[30px]">
                <div className="flex w-full">
                    <div className="ml-[20px] w-[52px] h-[72px] flex items-center justify-center mt-[20px]">
                        <img src={imageSrc} alt={`${name}'s profile`} />
                    </div>
                    <div className="flex flex-col justify-center pl-5 h-[72px] mt-[17px]">
                        <div className="text-lg font-bold">{name}</div>
                        <div className="text-base">{age} years old | {gender}</div>
                    </div>
                    <div className="ml-auto flex items-center pr-4">
                        <button className="text-sm text-r5 border border-r5 rounded-full w-[50px] h-[24px]">Edit</button>
                    </div>
                </div>
                <Textarea 
                    register={ register('describe') } 
                    initValue={"Hi, I'm Dennis. I'm 31 years old and I'm from Seoul, South Korea. I'm a software engineer with 5 years of experience in the industry. I'm passionate about building innovative products that make people's lives easier."}
                    className="bg-r1 mb-[20px] h-[120px] text-[14px]"
                    readonly={true}
                />
            </div>
            <ListContainer />
        </>
  );
}

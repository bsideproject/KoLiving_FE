/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/style-prop-object */
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, FieldError, useForm as UseForm } from 'react-hook-form';
import useModal from '@/hooks/useModal.ts';
import { isValidEmail, isRequired } from '@/utils/validCheck.ts';
import { Textarea, Button, Upload, Input, Calendar } from '@/components/index.tsx';
import ProfileCamera from '@/public/icons/profileCamera.svg';
import { User, Profile } from '@/public/types/user';
import { modifyProfile } from '@/api/userInfo';

interface ProfileProps {
  _imageSrc: string;
  userInfo: User;
}

interface ImageComponentClickProps {
  imageSrc: string;
  onClick?: () => void;
}

export default function EditProfile({ _imageSrc, userInfo }: ProfileProps) {
  const { openModal } = useModal();
  const [imageSrc, setImageSrc] = useState(_imageSrc);
  const subHeader = 'font-pretendard font-semibold text-[16px]';
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = UseForm({ mode: 'onChange' });
  const capitalizeFirstLetter = (str: string) => {
    return (str || '').charAt(0).toUpperCase() + (str || '').slice(1).toLowerCase();
  };

  const [buttonState, setButtonState] = useState(capitalizeFirstLetter(userInfo?.gender));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const profileData = data as Profile;
      profileData.profileId = userInfo.id || 0;
      const result = await modifyProfile(profileData);
      alert('수정되었습니다');
      // openModal({
      //   props: {
      //     title: 'My Postings',
      //     size: 'full',
      //     custom: true,
      //     customHeader: true,
      //   },
      //   children: <>hi</>,
      // });
    } catch (error) {
      console.error('[ERROR] EDIT PROFILE', error);
    }
  };

  const isPostingComplete = () => {
    return (
      (imageSrc || _imageSrc || '') === '' ||
      !watch('email') ||
      !!errors.email?.message ||
      !watch('firstName') ||
      !watch('lastName') ||
      !watch('dateOfBirth') ||
      !watch('describe')
    );
  };

  const handleButtonClick = (value: string) => {
    setButtonState(value);
  };

  const getButtonColor = (value: string) => {
    return buttonState === value ? 'r1' : 'outlined';
  };

  const genderButtons = [{ label: 'Male' }, { label: 'Female' }, { label: 'Others' }];

  const ProfileImage = ({ imageSrc, onClick }: ImageComponentClickProps) => {
    return (
      <div className="flex justify-center items-center h-[90px] mt-[20px] mb-[36px]" onClick={onClick}>
        <div style={{ position: 'relative', width: 90, height: 90 }} className="flex items-center justify-center">
          <div
            style={{
              borderRadius: '50%',
              overflow: 'hidden',
              width: '100%',
              height: '100%',
              border: '1px solid #dcdcdc',
              alignItems: 'center',
            }}
          >
            <img src={imageSrc || _imageSrc} className="object-cover w-full h-full" />
          </div>
          <div
            className="absolute border-g2 border-[1px] bottom-0 right-0 bg-g0 flex items-center justify-center"
            style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: '' }}
          >
            <ProfileCamera className="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="h-screen overflow-y-scroll font-pretendard">
        <div className="justify-center items-center flex">
          <Upload
            InitImageComponent={ProfileImage}
            multiImage={false}
            callbackImageFn={(imageList) => {
              if (imageList && imageList[0] && imageList[0].dataURL) {
                setImageSrc(imageList[0].dataURL);
              }
            }}
            style="center"
            register={register('images')}
          />
        </div>
        <div className="mb-[12px]">
          <div className={subHeader}>Email</div>
        </div>
        <div className="mb-[8px]">
          <Input
            type="email"
            placeholder="Your email"
            register={register('email', {
              validate: (value) => {
                return isRequired(value, '필수 항목') || isValidEmail(value, `Invalid email`);
                // return true;
              },
            })}
            error={errors.email as FieldError}
            fixedWord={userInfo?.email || ''}
          />
        </div>
        <div className="py-[28px]">
          <div className="mb-[12px]">
            <div className={subHeader}>Name</div>
          </div>
          <div className="mb-[8px]">
            <Input
              placeholder="First Name"
              type="text"
              register={register('firstName')}
              fixedWord={userInfo?.firstName || ''}
            />
          </div>
          <div className="mb-[8px]">
            <Input
              placeholder="Last Name"
              type="text"
              register={register('lastName')}
              fixedWord={userInfo?.lastName || ''}
            />
          </div>
        </div>
        <div className="mb-[12px]">
          <div className={subHeader}>Gender</div>
        </div>
        <div className="mb-[32px]">
          <div className="mb-3 grid grid-cols-3 gap-0 text-g0">
            {genderButtons.map((button, index) => (
              <div key={button.label + index}>
                <Button
                  size="lg"
                  type="button"
                  color={getButtonColor(button.label)}
                  onClick={() => handleButtonClick(button.label)}
                >
                  {button.label}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-[12px]">
          <div className={subHeader}>Date of birth</div>
        </div>
        <section className="mb-[8px]">
          <Calendar
            placeholder="MM-DD-YYYY"
            type="text"
            register={register('dateOfBirth')}
            value={userInfo?.birthDate}
          />
        </section>
        <div className="mb-[12px] mt-[32px]">
          <div className={subHeader}>About you</div>
        </div>
        <div className="mb-[250px]">
          <Textarea
            placeholder="Describe you to others!"
            register={register('describe')}
            maxByte={250}
            className="h-[172px] text-g7 border-g4 border-[1px]"
            initValue={userInfo?.description || ''}
          />
        </div>
        <div className="mt-[255px] fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
          <div className="w-full">
            <div className="mb-[13px]">
              <Button size="lg" type="submit" disabled={isPostingComplete()}>
                Complete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

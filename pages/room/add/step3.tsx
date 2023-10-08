import React from 'react';
import { ImageListType } from 'react-images-uploading';
import { Stepper, Textarea, Typography, Button, Upload } from '@/components/index.tsx';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { postRoom, uploadFile } from '@/api/room';
import useModal from '@/hooks/useModal';
import styles from './add.module.scss';

export default function Step3() {
  const { register, handleSubmit, watch } = useForm({ mode: 'onChange' });

  const router = useRouter();
  const { query } = router;
  const step2Params = query.data ? JSON.parse(query.data as string) : {};

  const uploadPhoto = (photoList: ImageListType) => {
    const uploadPromises = photoList.map(async (photo) => {
      if (!photo.file) {
        return null;
      }

      const result = await uploadFile(photo.file);
      return result;
    });

    return Promise.all(uploadPromises);
  };

  const { openModal, closeModal } = useModal();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const images = await uploadPhoto(data.images);
    const formattedImages = images.map((image) => image?.id);
    const params = {
      ...step2Params,
      imageIds: formattedImages,
      description: data.description,
    };

    try {
      await postRoom(params);

      openModal({
        props: {
          title: 'Congratulation!',
          content: 'Your room is now added to the list!',
          buttonType: 'default',
          buttonName: 'Complete',
          handleClose: () => {
            router.push('/');
            closeModal();
          },
          hasCloseButton: true,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Stepper step={3} totalStep={3} />
      <div className="overflow-y-scroll">
        <div className="mt-[9px] mb-[20px]" key="filter">
          <Typography variant="header" fontStyle="semiBold">
            Introduce your room
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-6/7 sm:w-1/2 md:w-3/7 lg:w-1/4 xl:w-1/5">
          <div className="mb-[4px]">
            <div className={styles['sub-header']}>Room Photos</div>
          </div>
          <div className="mb-[4px]">
            <div className="text-g5 text-[12px] font-normal">You can up load maximum 5 photos in total</div>
          </div>
          <Upload multiImage register={register('images')} />

          <hr className="mt-[32px]" />

          <div className="mt-[30px]">
            <Typography variant="body" customClassName="text-[16px] font-bold text-g7 mb-[12px]">
              About the house
            </Typography>
          </div>
          <Textarea placeholder="Describe your house to others!" register={register('description')} maxByte={3000} />
          <div className="mt-[111px] fixed bottom-0 w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
            <div className="w-full">
              <div className="mb-[13px]">
                <Button
                  size="lg"
                  type="submit"
                  disabled={!(watch('images') && watch('images').length) || !watch('description')}
                >
                  Complete
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

Step3.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DefaultLayout title="Add Rooms" handleButtonClick={() => window.history.back()}>
      <div className="pt-[31px]">{page}</div>
    </DefaultLayout>
  );
};

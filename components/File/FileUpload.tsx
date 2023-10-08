import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Rectangle from '@/public/icons/rectangle.svg';
import RectangleCamera from '@/public/icons/rectangleCamera.svg';
import styles from '@/components/File/FileUpload.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import Delete from '@/public/icons/delete.svg';

interface ImageComponentClickProps {
  imageSrc: string;
  onClick: () => void;
}

interface FileUploadProps {
  multiImage: boolean;
  callbackImageFn?: (imageList: ImageListType) => void;
  InitImageComponent?: React.ComponentType<ImageComponentClickProps> | null;
  style?: 'center' | 'left' | 'default';
  register: UseFormRegisterReturn;
}

export default function FileUpload({ callbackImageFn, InitImageComponent, multiImage, register }: FileUploadProps) {
  const [images, setImages] = React.useState<ImageListType>([]);
  const maxNumber = 5;

  const onChange = (imageList: ImageListType) => {
    const lastImage = imageList.slice(-1);
    const customEvent = {
      target: {
        name: register.name,
        value: lastImage,
      },
    };

    if (multiImage) {
      customEvent.target.value = imageList;
      setImages(imageList);
    } else {
      setImages(lastImage);
    }
    callbackImageFn?.(imageList);
    register.onChange(customEvent);
  };

  return (
    <div className="App inline-block">
      {
        <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
          {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
            // write your building UI
            <div className="flex">
              {!InitImageComponent ? (
                <div
                  className="relative w-[108px] h-[110px] mt-[8px]"
                  {...dragProps}
                  onClick={() => {
                    if ((imageList || []).length < 5) {
                      onImageUpload();
                    }
                  }}
                >
                  <Rectangle className="z-0" />
                  <RectangleCamera
                    className={`absolute z-10 top-[45px] left-[55px] transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer ${
                      isDragging ? 'bg-r1' : ''
                    }`}
                  />
                  <span
                    className={`absolute z-10 top-[67px] left-[55px] transform -translate-x-1/2 -translate-y-1/2 text-g4 semibold text-[12px] ${
                      isDragging ? 'text-r1' : ''
                    }`}
                  >
                    {(imageList || []).length}/{maxNumber}
                  </span>
                </div>
              ) : (
                <InitImageComponent
                  imageSrc={(imageList || []).length > 0 ? imageList[0].dataURL || '' : ''}
                  onClick={onImageUpload}
                />
              )}
              <div className="whitespace-nowrap overflow-x-auto">
                {multiImage && (
                  <div className="w-[236px]">
                    {imageList.map((image, index) => (
                      <div
                        key={index}
                        className="image-item relative inline-block w-[108px] h-[108px] mt-[8px] rounded-[2px] ml-[8px]"
                      >
                        <img
                          src={image.dataURL}
                          alt=""
                          className="top-0 left-0 object-cover rounded-[2px] w-[108px] h-[108px] "
                        />
                        <button
                          className={`absolute top-0 right-0 text-g1 w-[24px] h-[24px] cursor-pointer ${styles['delete-button']}`}
                          onClick={() => onImageRemove(index)}
                        >
                          <Delete className="m-[7px]" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </ImageUploading>
      }
    </div>
  );
}

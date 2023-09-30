import React, { ReactElement, ComponentType } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Rectangle from '@/public/icons/rectangle.svg';
import RectangleCamera from '@/public/icons/rectangleCamera.svg';
import styles from '@/components/File/FileUpload.module.scss';

interface ImageComponentClickProps {
  imageSrc: string;
  onClick: () => void;
}

interface FileUploadProps {
  multiImage: boolean;
  callbackImageFn?: (imageList: ImageListType) => void;
  InitImageComponent: React.ComponentType<ImageComponentClickProps> | null;
  style?: 'center' | 'left' | 'default';
}

export default function FileUpload({ callbackImageFn, InitImageComponent, multiImage, style }: FileUploadProps) {
  const [images, setImages] = React.useState<ImageListType>([]);
  const maxNumber = 5;

  const onChange = (imageList: ImageListType) => {
    const lastImage = imageList.slice(-1);
    multiImage ? setImages(imageList) : setImages(lastImage);
    callbackImageFn?.(imageList);
  };

  return (
    <div className="App">
      {
        <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber}>
          {({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
            // write your building UI
            <div className={`upload__image-wrapper ${styles[`${style || 'default'}`]}`}>
              {InitImageComponent === null ? (
                <div className="relative w-[108px] h-[110px] mt-[8px]" {...dragProps}>
                  <Rectangle className="z-0" />
                  <RectangleCamera
                    className={`absolute z-10 top-[45px] left-[55px] transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer ${
                      isDragging ? 'bg-r1' : ''
                    }`}
                    onClick={() => {
                      (imageList || []).length < 5 && onImageUpload();
                    }}
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
              &nbsp;
              {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
              {multiImage &&
                imageList.map((image, index) => (
                  <div key={index} className="image-item relative w-[108px] h-[108px] mt-[8px]">
                    <img src={image.dataURL} alt="" className="top-0 left-0 w-full h-full object-cover" />
                    <button
                      className="absolute top-0 right-0 bg-g5 text-g1 w-5 h-5 -translate-y-[0.5%] cursor-pointer leading-[4px]"
                      onClick={() => onImageRemove(index)}
                    >
                      {' '}
                      x
                    </button>
                  </div>
                ))}
            </div>
          )}
        </ImageUploading>
      }
    </div>
  );
}

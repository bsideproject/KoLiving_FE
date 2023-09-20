import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Rectangle from '@/public/icons/rectangle.svg';
import RectangleCamera from '@/public/icons/rectangleCamera.svg';


export default function FileUpload() {
  const [images, setImages] = React.useState<ImageListType>([]);
  const maxNumber = 5;

  const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  
   };

  return (
    <div className="App">
      { 
        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
        >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <div className="relative w-[120px] h-[110px] mt-[8px]" style={isDragging ? { color: "red" } : undefined} {...dragProps}> 
                <Rectangle className="z-0" />
                <RectangleCamera className="absolute z-10 top-[45px] left-[55px] transform -translate-x-1/2 -translate-y-1/2 hover:cursor-pointer" onClick={onImageUpload}/>
                <span className="absolute z-10 top-[67px] left-[55px] transform -translate-x-1/2 -translate-y-1/2 text-g4 semibold text-[12px]">3/5</span>
            </div>
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.dataURL} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  {/* <button onClick={() => onImageUpdate(index)}>Update</button> */}
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    }
    </div>
  );
}

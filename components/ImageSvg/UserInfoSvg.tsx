import React from 'react';

interface ImageSvgProps {
  imageUrl: string;
}

const UserInfoSvg = ({ imageUrl }: ImageSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="52"
      height="72"
      viewBox="0 0 52 72"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.325 0L52 20.6303V59.6775H43.623L32.76 72V59.6775H0V20.6303L26.325 0Z"
        fill="url(#pattern0)"
      />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_2894_10795" transform="matrix(0.00318302 0 0 0.00229885 -0.192308 0)" />
        </pattern>
        <image id="image0_2894_10795" width="435" height="435" xlinkHref={imageUrl} />
      </defs>
    </svg>
  );
};

export default UserInfoSvg;

import React from 'react';

interface ImageSvgProps {
  imageUrl: string;
}

const MyImageSvg = ({ imageUrl }: ImageSvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="40"
      height="55"
      viewBox="0 0 40 55"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.25 0L40 15.7593V45.587H33.5562L25.2 55V45.587H0V15.7593L20.25 0Z"
        fill="url(#pattern0)"
      />
      <defs>
        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_1191_4790" transform="matrix(0.00101317 0 0 0.000736852 0 -0.0452703)" />
        </pattern>
        <image
          id="image0_1191_4790"
          width="987"
          height="1480"
          preserveAspectRatio="xMidYMid slice"
          xlinkHref={imageUrl}
        />
      </defs>
    </svg>
  );
};

export default MyImageSvg;

import React from 'react';
import NotFound from '@/public/icons/404_bg.svg';
import LinkLine from '@/public/icons/linkLine.svg';
import Typography from '@/components/Typography/Typography';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-g2">
      <div className="w-[271px] h-[142px] relative">
        <NotFound className="absolute inset-0" />
        <div className="absolute inset-0 bg-g0 flex flex-col justify-end">
          <span className="text-white text-2xl font-bold mb-2">
            <Typography variant="header" customClassName="text-center">
              Something&apos;s missing.
            </Typography>
            <Typography variant="label" customClassName="text-center">
              This page is missing or you assembled <br /> the link incorrectly
            </Typography>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

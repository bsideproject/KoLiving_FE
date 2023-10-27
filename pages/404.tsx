/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import ErrorPage from '@/public/icons/errorPageImage.svg';

export default function NoPostings() {
  const noPostingStyle = 'text-[20px] font-bold mt-[29px] text-center';
  const containerStyle = 'flex flex-col items-center justify-start mt-[135px]'; // 'justify-start'로 변경

  return (
    <div className={containerStyle}>
      <ErrorPage />
      <div className={noPostingStyle}>{`Something's missing.`}</div>
      <div className="text-[16px] text-g5 font-pretendard">This page is missing or you assembled</div>
      <div className="text-[16px] text-g5 font-pretendard">the link incorrectly</div>
      <div className="fixed bottom-[0px] w-full overflow-x-hidden left-[50%] translate-x-[-50%] px-[20px] max-w-max">
        <div className="w-full">
          <hr />
          <div className="mb-[13px] space-x-[8px] max-w-max">
            <button
              className="font-pretendard text-[16px] font-semibold bg-r1 border border-solid border-r1 rounded-[2px] text-g0 w-full h-[48px] items-center "
              onClick={() => window.history.back()}
              type="button"
              data-size="md"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

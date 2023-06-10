import React from 'react';
import { NextPageContext } from 'next';

interface ErrorProps {
  statusCode?: number;
  message?: string;
}

function Error({ statusCode, message }: ErrorProps) {
  return (
    <div>
      <h1>{statusCode}</h1>
      <p>{message}</p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext): ErrorProps => {
  const statusCode = (res && res.statusCode) || (err && err.statusCode) || 404;
  const message = err ? err.message : '오류오류오류~~';
  return { statusCode, message };
};

export default Error;

Error.defaultProps = {
  statusCode: 200,
  message: '성공',
};

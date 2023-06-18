'use client';

import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '@/public/json/loading.json';

function Login() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
}

export default Login;

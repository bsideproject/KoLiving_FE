import React from 'react';
import '../styles/tailwind.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>KoLiving</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default appWithTranslation(MyApp);

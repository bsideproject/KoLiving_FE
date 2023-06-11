import React from 'react';
import '../styles/tailwind.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import ModalProvider from '../context/ModalProvider.tsx';
import ModalContainer from '../components/Modal/ModalContainer.tsx';
import AppLayout from '../components/layout/AppLayout.tsx';
import Footer from './Footer.tsx';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>KoLiving</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ModalProvider>
        <AppLayout>
          <Component {...pageProps} />
          <ModalContainer />
          <footer>
            <Footer />
          </footer>
        </AppLayout>
      </ModalProvider>
    </>
  );
}

export default appWithTranslation(MyApp);

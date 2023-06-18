import React from 'react';
import '../styles/tailwind.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import Header from '@/components/Header/Header.tsx';
import ModalProvider from '../context/ModalProvider.tsx';
import ModalContainer from '../components/Modal/ModalContainer.tsx';
import AppLayout from '../components/layout/AppLayout.tsx';
import Footer from '../container/Footer/Footer.tsx';
import Nav from '../components/Nav/Nav.tsx';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>KoLiving</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <ModalProvider>
        <AppLayout>
          <Header type="back" title="Title" right="pencil" bgColor="white" />
          <Component {...pageProps} />
          <ModalContainer />
          <Nav />
        </AppLayout>
      </ModalProvider>
    </>
  );
}

export default appWithTranslation(MyApp);

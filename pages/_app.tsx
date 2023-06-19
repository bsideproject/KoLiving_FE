import React from 'react';
import '../styles/tailwind.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { NextPage } from 'next';
import ModalProvider from '../context/ModalProvider.tsx';
import ModalContainer from '../components/Modal/ModalContainer.tsx';
import AppLayout from '../components/layouts/AppLayout/AppLayout.tsx';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface LayoutAppProps extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: LayoutAppProps): React.ReactElement {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>KoLiving</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <ModalProvider>
        <AppLayout>
          {getLayout(<Component {...pageProps} />)}
          <ModalContainer />
        </AppLayout>
      </ModalProvider>
    </>
  );
}

export default appWithTranslation(MyApp);

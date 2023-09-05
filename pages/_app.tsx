import React from 'react';
import '../styles/tailwind.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
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

  const Toaster = dynamic(() => import('react-hot-toast').then((c) => c.Toaster), {
    ssr: false,
  });

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
      <Toaster
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '4px',
            boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
            width: '100%',
            textAlign: 'left',
            bottom: '115px',
            justifyContent: 'left',
          },
          error: {
            style: {
              background: '#F44225',
              color: '#FAFAFA',
            },
          },
          icon: null,
        }}
        position="bottom-center"
        containerStyle={{
          bottom: '80px',
        }}
      />
    </>
  );
}

export default appWithTranslation(MyApp);

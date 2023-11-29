import React, { useEffect } from 'react';
import '../styles/tailwind.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Providers from '@/context/Providers.tsx';
import { SessionProvider, getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import UserInfoProvider from '@/context/UserInfoProvider.tsx';
import ModalProvider from '../context/ModalProvider.tsx';
import ModalContainer from '../components/Modal/ModalContainer.tsx';
import AppLayout from '../components/layouts/AppLayout/AppLayout.tsx';
import NotificationProvider from '../context/NotificationProvider.tsx';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface LayoutAppProps extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: LayoutAppProps): React.ReactElement {
  const { token } = pageProps;
  const [data, setData] = React.useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { fetch: originalFetch } = window;
      if (token) {
        window.fetch = async (...args) => {
          // eslint-disable-next-line prefer-const
          let [resource, config] = args;
          const configHeaders = config?.headers ?? {};

          config = {
            ...config,
            headers: {
              ...configHeaders,
              Authorization: `Bearer ${token}`,
            },
          };

          // const response = await originalFetch(resource, config);
          const response = await originalFetch(resource as globalThis.Request, config);

          return response;
        };
        setData(true);
      }
      setData(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Providers>
        <NotificationProvider>
          <SessionProvider>
            <ModalProvider>
              <UserInfoProvider>
                {data && (
                  <AppLayout>
                    {getLayout(<Component {...pageProps} />)}
                    <ModalContainer />
                  </AppLayout>
                )}
              </UserInfoProvider>
            </ModalProvider>
          </SessionProvider>
        </NotificationProvider>
      </Providers>
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

export interface CustomUser {
  id: string;
  name: string;
  token: string;
  exp: number;
}

export interface CustomSession extends Session {
  user: CustomUser;
}

MyApp.getInitialProps = async (appContext: any) => {
  const { Component, ctx } = appContext;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  const session = (await getSession(appContext)) as CustomSession;

  pageProps = {
    ...pageProps,
    token: session?.user?.token,
  };
  return { pageProps };
};

export default appWithTranslation(MyApp);

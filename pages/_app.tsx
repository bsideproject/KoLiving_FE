import React, { useContext } from 'react';
import '../styles/tailwind.scss';
import '../styles/globals.scss';
import type { AppContext, AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Providers from '@/context/Providers.tsx';
import { SessionProvider } from 'next-auth/react';
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
      <Providers>
        <SessionProvider>
          <ModalProvider>
            <AppLayout pageProps={pageProps}>
              {getLayout(<Component {...pageProps} />)}
              <ModalContainer />
            </AppLayout>
          </ModalProvider>
        </SessionProvider>
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

// MyApp.getInitialProps = async ({ Component, ctx, req }: any) => {
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   pageProps = {
//     ...pageProps,
//     token: ctx.req?.cookies?.['next-auth.session-token'],
//   };
//   // props.session = await NextAuth.init({force: true, req: req})
//   // const session = await getSession(AppContext);
//   console.log('%c 🤩🤩🤩 영우의 로그 : ', 'font-size: x-large; color: #bada55;', '');
//   return { pageProps };
// };

export default appWithTranslation(MyApp);

import React from 'react';
import Head from './head.tsx';
import Nav from './components/Nav/Nav.tsx';
import Header from './components/Header/Header.tsx';
import '../styles/tailwind.scss';
import '../styles/globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head />
      <body className="justify-center max-w-[448px] min-w-[360px] mx-auto">
        <Header />
        {children}
        <Nav />
      </body>
    </html>
  );
}

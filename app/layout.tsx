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
      <body>
        <Header type="back" title="Title" right="pencil" />
        {children}
        <Nav />
      </body>
    </html>
  );
}

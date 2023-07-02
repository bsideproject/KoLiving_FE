import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <div id="modal-root" className="z-[1001] relative" />
        <NextScript />
      </body>
    </Html>
  );
}

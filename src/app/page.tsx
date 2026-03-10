'use client';

import Script from 'next/script';

export default function Home() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: 'rgb(38, 38, 38)',
      }}
    >
      <div data-tf-live="01JNGRA71HFRKW8W1QANHEG3WX" style={{ width: '100%', height: '100%' }}></div>
      <Script src="//embed.typeform.com/next/embed.js" strategy="afterInteractive" />
    </div>
  );
}

import '@/styles/globals.css'
import Head from 'next/head';
import type { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <>
        <Component {...pageProps} />
        <CssBaseline />
      </>
    </>
  )
}

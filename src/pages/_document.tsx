import { Html, Head, Main, NextScript } from 'next/document'
import theme, { roboto } from '@/styles/theme';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Head>
      <body className={roboto.className}>
          <Main />
          <NextScript />
      </body>
    </Html>
  )
}

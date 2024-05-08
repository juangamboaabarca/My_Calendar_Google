import '../lib/dayjs'

import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/react-query'
import { DefaultSeo } from 'next-seo'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <DefaultSeo   //revisar https://blog.logrocket.com/manage-seo-next-js-with-next-seo/
          openGraph={{
            type: 'website',
            locale: 'es-MX',
            url: 'https://',
            siteName: 'My Calendar',
          }}
        />

        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  )
}

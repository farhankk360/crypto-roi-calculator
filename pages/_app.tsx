import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import { FiatCurrencyProvider } from '../lib/contexts/fiatCurrency/fiatCurrencyContext'
import { CryptoCurrencyProvider } from '../lib/contexts/cryptoCurrency/cryptoCurrencyContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <title>
          Crypto Return On Investment Calculator, Bitcoin (BTC), Ethereum (ETH),
          Binance Coin (BNB) and more...
        </title>
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system">
        <FiatCurrencyProvider>
          <CryptoCurrencyProvider>
            <Component {...pageProps} />
          </CryptoCurrencyProvider>
        </FiatCurrencyProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp

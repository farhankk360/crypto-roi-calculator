import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { FiatCurrencyProvider } from '../lib/contexts/fiatCurrency/fiatCurrencyContext'
import { CryptoCurrencyProvider } from '../lib/contexts/cryptoCurrency/cryptoCurrencyContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <FiatCurrencyProvider>
        <CryptoCurrencyProvider>
          <Component {...pageProps} />
        </CryptoCurrencyProvider>
      </FiatCurrencyProvider>
    </ThemeProvider>
  )
}

export default MyApp

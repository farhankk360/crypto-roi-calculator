import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { CurrencyProvider } from '../lib/contexts/currency/currencyContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <CurrencyProvider>
        <Component {...pageProps} />
      </CurrencyProvider>
    </ThemeProvider>
  )
}

export default MyApp

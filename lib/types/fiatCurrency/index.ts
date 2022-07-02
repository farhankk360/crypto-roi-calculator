export interface FiatCurrency {
  code: string
  number: string
  digits: number
  currency: string
  countries: string[]
  symbol?: string
}
export interface FiatCurrencyExchangeRates {
  base: string
  date: string
  rates: { [key: string]: number }
}

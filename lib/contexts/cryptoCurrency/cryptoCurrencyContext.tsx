import {
  ReactNode,
  createContext,
  useReducer,
  useContext,
  useEffect,
} from 'react'
import type { CryptoCurrency } from '../../types'

type State = {
  selectedCrypto: CryptoCurrency
  cryptoCurrencies: CryptoCurrency[]
  priceIntoFiat: number
}

const initialValue = {
  selectedCrypto: {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    current_price: 19299.64,
    market_cap: 368264000090,
    market_cap_rank: 1,
    fully_diluted_valuation: 405252856320,
    total_volume: 17012534127,
    high_24h: 19615.68,
    low_24h: 19059.83,
    price_change_24h: -184.01997105918417,
    price_change_percentage_24h: -0.94448,
    market_cap_change_24h: -3475934083.453308,
    market_cap_change_percentage_24h: -0.93504,
    circulating_supply: 19083256,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 69045,
    ath_change_percentage: -72.04058,
    ath_date: '2021-11-10T14:24:11.849Z',
    atl: 67.81,
    atl_change_percentage: 28368.95956,
    atl_date: '2013-07-06T00:00:00.000Z',
    roi: null,
    last_updated: '2022-07-02T18:19:17.612Z',
    price_change_percentage_24h_in_currency: -0.9444833899535172,
  },
  priceIntoFiat: 19299.64,
  cryptoCurrencies: [],
}

type SetSelectedCryptoAction = {
  type: 'set_crypto_currency'
  payload: CryptoCurrency
}
type SetCryptoCurrenciesAction = {
  type: 'set_crypto_currencies'
  payload: CryptoCurrency[]
}
type SetCryptoPriceIntoFiatAction = {
  type: 'set_crypto_price_into_fiat'
  payload: number
}
type SetCryptoCurrencyStateAction = {
  type: 'set_crypto_currency_state'
  payload: State
}

type Dispatch = (
  action:
    | SetSelectedCryptoAction
    | SetCryptoCurrenciesAction
    | SetCryptoPriceIntoFiatAction
    | SetCryptoCurrencyStateAction
) => void

type CryptoCurrencyProviderProps = { children: ReactNode }

const CryptoCurrencyStateContext = createContext<
  { cryptoCurrencyState: State; dispatch: Dispatch } | undefined
>(undefined)

function cryptoCurrencyReducer(
  state: State,
  action:
    | SetSelectedCryptoAction
    | SetCryptoCurrenciesAction
    | SetCryptoPriceIntoFiatAction
    | SetCryptoCurrencyStateAction
) {
  switch (action.type) {
    case 'set_crypto_currency': {
      return { ...state, selectedCrypto: action.payload }
    }
    case 'set_crypto_currencies': {
      return { ...state, cryptoCurrencies: action.payload }
    }
    case 'set_crypto_price_into_fiat': {
      return { ...state, priceIntoFiat: action.payload }
    }
    case 'set_crypto_currency_state': {
      return { ...state, ...action.payload }
    }
    default: {
      return state
    }
  }
}

function CryptoCurrencyProvider({ children }: CryptoCurrencyProviderProps) {
  const [cryptoCurrencyState, dispatch] = useReducer(
    cryptoCurrencyReducer,
    initialValue
  )
  const value = { cryptoCurrencyState, dispatch }

  useEffect(() => {
    const savedCryptoCurrencyState = localStorage.getItem(
      'crypto_currency_state'
    )

    if (savedCryptoCurrencyState) {
      dispatch({
        type: 'set_crypto_currency_state',
        payload: JSON.parse(savedCryptoCurrencyState) as State,
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'set_crypto_currency_state',
      JSON.stringify(cryptoCurrencyState)
    )
  }, [cryptoCurrencyState])

  return (
    <CryptoCurrencyStateContext.Provider value={value}>
      {children}
    </CryptoCurrencyStateContext.Provider>
  )
}

function useCryptoCurrency() {
  const context = useContext(CryptoCurrencyStateContext)
  if (context === undefined) {
    throw new Error('useFiatCurrency must be used within a CurrencyProvider')
  }
  return context
}

export { CryptoCurrencyProvider, useCryptoCurrency }

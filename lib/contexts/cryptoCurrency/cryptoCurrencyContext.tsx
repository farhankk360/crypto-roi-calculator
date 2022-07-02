import {
  ReactNode,
  createContext,
  useReducer,
  useContext,
  useEffect,
} from 'react'
import type { CryptoCurrency } from '../../types'

type State = {
  selectedCrypto: CryptoCurrency | null
  cryptoCurrencies: CryptoCurrency[] | null
}

const initialValue = {
  selectedCrypto: null,
  cryptoCurrencies: null,
}

type SetSelectedCryptoAction = {
  type: 'set_crypto_currency'
  payload: CryptoCurrency
}
type SetCryptoCurrenciesAction = {
  type: 'set_crypto_currencies'
  payload: CryptoCurrency[]
}
type SetCryptoCurrencyStateAction = {
  type: 'set_crypto_currency_state'
  payload: State
}

type Dispatch = (
  action:
    | SetSelectedCryptoAction
    | SetCryptoCurrenciesAction
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
    | SetCryptoCurrencyStateAction
) {
  switch (action.type) {
    case 'set_crypto_currency': {
      // localStorage.setItem('crypto_currency', JSON.stringify(action.payload))
      return { ...state, selectedCrypto: action.payload }
    }
    case 'set_crypto_currencies': {
      // localStorage.setItem('crypto_currency', JSON.stringify(action.payload))
      return { ...state, cryptoCurrencies: action.payload }
    }
    case 'set_crypto_currency_state': {
      // localStorage.setItem('crypto_currency', JSON.stringify(action.payload))
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

    return () => {
      localStorage.setItem(
        'set_crypto_currency_state',
        JSON.stringify(cryptoCurrencyState)
      )
    }
  }, [])

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

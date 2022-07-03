import {
  ReactNode,
  createContext,
  useReducer,
  useContext,
  useEffect,
} from 'react'
import type { FiatCurrency, FiatCurrencyExchangeRates } from '../../types'

type State = {
  selectedFiatCurrency: FiatCurrency | null
  fiatCurrencyExchangeRates: FiatCurrencyExchangeRates | null
}

const initialValue = {
  selectedFiatCurrency: {
    code: 'USD',
    number: '840',
    digits: 2,
    currency: 'US Dollar',
    countries: [
      'American Samoa',
      'Bonaire, Sint Eustatius and Saba',
      'British Indian Ocean Territory (The)',
      'Ecuador',
      'El Salvador',
      'Guam',
      'Haiti',
      'Marshall Islands (The)',
      'Micronesia (Federated States Of)',
      'Northern Mariana Islands (The)',
      'Palau',
      'Panama',
      'Puerto Rico',
      'Timor-Leste',
      'Turks and Caicos Islands (The)',
      'United States Minor Outlying Islands (The)',
      'United States of America (The)',
      'Virgin Islands (British)',
      'Virgin Islands (U.S.)',
    ],
    symbol: '$',
  },
  fiatCurrencyExchangeRates: null,
}

type SetFiatCurrencyAction = {
  type: 'set_fiat_currency'
  payload: FiatCurrency
}
type SetFiatCurrencyExchangeRatesAction = {
  type: 'set_fiat_currency_exchange_rates'
  payload: FiatCurrencyExchangeRates
}
type SetFiatCurrencyState = { type: 'set_fiat_currency_state'; payload: State }

type Dispatch = (
  action:
    | SetFiatCurrencyAction
    | SetFiatCurrencyExchangeRatesAction
    | SetFiatCurrencyState
) => void

type FiatCurrencyProviderProps = { children: ReactNode }

const FiatCurrencyStateContext = createContext<
  { fiatCurrencyState: State; dispatch: Dispatch } | undefined
>(undefined)

function fiatCurrencyReducer(
  state: State,
  action:
    | SetFiatCurrencyAction
    | SetFiatCurrencyExchangeRatesAction
    | SetFiatCurrencyState
) {
  switch (action.type) {
    case 'set_fiat_currency': {
      return { ...state, selectedFiatCurrency: action.payload }
    }
    case 'set_fiat_currency_exchange_rates': {
      return { ...state, fiatCurrencyExchangeRates: action.payload }
    }
    case 'set_fiat_currency_state': {
      return { ...state, ...action.payload }
    }
    default: {
      return state
    }
  }
}

function FiatCurrencyProvider({ children }: FiatCurrencyProviderProps) {
  const [fiatCurrencyState, dispatch] = useReducer(
    fiatCurrencyReducer,
    initialValue
  )
  const value = { fiatCurrencyState, dispatch }

  useEffect(() => {
    const savedFiatCurrencyState = localStorage.getItem('fiat_currency_state')

    if (savedFiatCurrencyState) {
      dispatch({
        type: 'set_fiat_currency_state',
        payload: JSON.parse(savedFiatCurrencyState) as State,
      })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(
      'fiat_currency_state',
      JSON.stringify(fiatCurrencyState)
    )
  }, [fiatCurrencyState])

  return (
    <FiatCurrencyStateContext.Provider value={value}>
      {children}
    </FiatCurrencyStateContext.Provider>
  )
}

function useFiatCurrency() {
  const context = useContext(FiatCurrencyStateContext)
  if (context === undefined) {
    throw new Error('useFiatCurrency must be used within a CurrencyProvider')
  }
  return context
}

export { FiatCurrencyProvider, useFiatCurrency }

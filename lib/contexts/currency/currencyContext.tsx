import {
  ReactNode,
  createContext,
  useReducer,
  useContext,
  useEffect,
} from 'react'
import type { Currency } from '../../types'

const initialValue = {
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
}

type Action = { type: 'set_currency'; payload: Currency }
type Dispatch = (action: Action) => void

type State = {
  currency: Currency
}

type CurrencyProviderProps = { children: ReactNode }

const CurrencyStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

function currencyReducer(state: State, action: Action) {
  switch (action.type) {
    case 'set_currency': {
      localStorage.setItem('currency', JSON.stringify(action.payload))
      return { currency: action.payload }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [state, dispatch] = useReducer(currencyReducer, {
    currency: initialValue,
  })
  const value = { state, dispatch }

  useEffect(() => {
    const currency = localStorage.getItem('currency')

    if (currency) {
      dispatch({
        type: 'set_currency',
        payload: JSON.parse(currency) as Currency,
      })
    }

    return () => {
      localStorage.setItem('currency', JSON.stringify(state.currency))
    }
  }, [])

  return (
    <CurrencyStateContext.Provider value={value}>
      {children}
    </CurrencyStateContext.Provider>
  )
}

function useCurrency() {
  const context = useContext(CurrencyStateContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}

export { CurrencyProvider, useCurrency }

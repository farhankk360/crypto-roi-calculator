export interface CryptoCurrency {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: null | number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: null | number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: 6.25422
  atl_date: string
  roi: null | number
  last_updated: string
  price_change_percentage_24h_in_currency: number
}

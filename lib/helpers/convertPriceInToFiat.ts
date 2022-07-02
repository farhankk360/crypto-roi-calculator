export function convertPriceInToFiat(
  code = 'USD',
  exchangeRates?: { [key: string]: number },
  currentPrice?: number
) {
  if (code === 'USD' && currentPrice) return currentPrice
  if (exchangeRates?.[code] && currentPrice)
    return exchangeRates[code] * currentPrice
  return 0
}

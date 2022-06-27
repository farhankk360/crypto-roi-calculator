export function investmentCalculator(
  currentCoinPrice = 0,
  investmentAmount = 0,
  futureCoinPrice = 0
) {
  if (currentCoinPrice && investmentAmount && futureCoinPrice) {
    const totalCoins = investmentAmount / currentCoinPrice
    const result = totalCoins * futureCoinPrice - investmentAmount
    const roi = ((totalCoins * futureCoinPrice) / investmentAmount) * 100 - 100
    const totalAmount = totalCoins * futureCoinPrice

    return {
      total_coins: totalCoins && totalCoins !== Infinity ? totalCoins : 0,
      profit: result ? result?.toFixed(2) : 0,
      roi_percentage: roi ? roi.toFixed(2) : 0,
      total: totalAmount ? totalAmount.toFixed(2) : 0,
    }
  }

  return {
    total_coins: 0,
    profit: 0,
    roi_percentage: 0,
    total: 0,
  }
}

import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import { MainNav, CryptoCurrencySelector } from '../components'
import { Input } from '../lib/ui_library'
import { useFiatCurrency } from '../lib/contexts/fiatCurrency/fiatCurrencyContext'
import { useCryptoCurrency } from '../lib/contexts/cryptoCurrency/cryptoCurrencyContext'
import {
  investmentCalculator,
  convertPriceInToFiat,
  isNegative,
} from '../lib/helpers'
import type { CryptoCurrency } from '../lib/types'

const Home: NextPage<any> = (props) => {
  const {
    fiatCurrencyState: { selectedFiatCurrency, fiatCurrencyExchangeRates },
    dispatch: fiatDispatch,
  } = useFiatCurrency()

  const {
    cryptoCurrencyState: { selectedCrypto, cryptoCurrencies, priceIntoFiat },
    dispatch: cryptoDispatch,
  } = useCryptoCurrency()

  const [inputValues, setInputValues] = useState({
    investment: '',
    initialPrice: '',
    sellingPrice: '',
  })

  useEffect(() => {
    if (props?.exchangeRateRes) {
      fiatDispatch({
        type: 'set_fiat_currency_exchange_rates',
        payload: {
          base: props.exchangeRateRes.base,
          date: props.exchangeRateRes.date,
          rates: props.exchangeRateRes.rates,
        },
      })
    }
    if (props?.cyptoDataRes?.length) {
      cryptoDispatch({
        type: 'set_crypto_currencies',
        payload: props.cyptoDataRes,
      })

      const localState = localStorage.getItem('set_crypto_currency_state')
      if (localState) {
        const parsed = JSON.parse(localState)

        if (parsed.selectedCrypto) {
          const prevSelected = props.cyptoDataRes.find(
            (crypto: CryptoCurrency) => crypto.id === parsed.selectedCrypto.id
          )
          cryptoDispatch({
            type: 'set_crypto_currency',
            payload: prevSelected || props.cyptoDataRes[0],
          })
        }
      } else {
        cryptoDispatch({
          type: 'set_crypto_currency',
          payload: props.cyptoDataRes[0],
        })
      }
    }
  }, [])

  useEffect(() => {
    if (
      selectedFiatCurrency?.code &&
      fiatCurrencyExchangeRates?.rates?.[selectedFiatCurrency?.code]
    ) {
      cryptoDispatch({
        type: 'set_crypto_price_into_fiat',
        payload: convertPriceInToFiat(
          selectedFiatCurrency.code,
          fiatCurrencyExchangeRates?.rates,
          selectedCrypto.current_price
        ),
      })
    }
  }, [
    selectedFiatCurrency?.code,
    fiatCurrencyExchangeRates?.rates,
    selectedCrypto?.current_price,
  ])

  useEffect(() => {
    if (priceIntoFiat) {
      setInputValues({
        ...inputValues,
        investment: '',
        initialPrice: priceIntoFiat.toString(),
        sellingPrice: (priceIntoFiat * 2).toString(),
      })
    }
  }, [priceIntoFiat])

  const { total_coins, profit, roi_percentage, total } = investmentCalculator(
    Number(inputValues.initialPrice),
    Number(inputValues.investment),
    Number(inputValues.sellingPrice)
  )

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    if (!isNegative(value)) {
      setInputValues({ ...inputValues, [name]: value })
    }
  }

  const currencySymbol = (
    <div className="rounded-l border border-r-0 bg-slate-600 px-4 py-2 text-white dark:border-slate-600 dark:bg-slate-700">
      {selectedFiatCurrency?.symbol || ''}
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 transition-all duration-200 dark:bg-[#122334]">
      <main className="flex w-full flex-1 flex-col">
        <MainNav />

        <div className="flex flex-1 flex-col items-center justify-center px-4">
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around rounded-xl shadow-2xl dark:bg-[#182b3c] sm:w-full">
            <div className="mt-6 mb-6 w-full p-6 text-left lg:w-96">
              <CryptoCurrencySelector />

              <div className="mt-10">
                <div className="mt-6">
                  <p className="pb-2 text-sm text-black dark:text-white">
                    Investment
                  </p>
                  <div className="flex">
                    {currencySymbol}
                    <Input
                      value={inputValues.investment}
                      min={0}
                      type="number"
                      name="investment"
                      inputClassName="border-l-0"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="pb-2 text-sm text-black dark:text-white">
                    Initial Asset Price
                  </p>
                  <div className="flex">
                    {currencySymbol}
                    <Input
                      value={inputValues.initialPrice}
                      min={0}
                      type="number"
                      name="initialPrice"
                      inputClassName="border-l-0"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="pb-2 text-sm text-black dark:text-white">
                    Selling Price
                  </p>
                  <div className="flex">
                    {currencySymbol}
                    <Input
                      value={inputValues.sellingPrice}
                      min={0}
                      type="number"
                      name="sellingPrice"
                      inputClassName="border-l-0"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-6 w-full px-2 lg:w-96 ">
              <div className="rounded border border-slate-400 p-6 dark:border-slate-700">
                <div className="flex flex-col">
                  <div className="mb-5 flex">
                    <p className="font-semibold">Coins</p>
                    <p className="ml-auto font-light uppercase">
                      {total_coins} {selectedCrypto.symbol || ''}
                    </p>
                  </div>
                  <div className="mb-5 flex">
                    <p className="font-semibold">Total</p>
                    <p className="ml-auto font-light">
                      {selectedFiatCurrency?.symbol || ''} {total}
                    </p>
                  </div>
                  <div className="mb-5 flex">
                    <p className="font-semibold">ROI</p>
                    <p
                      className={`ml-auto text-2xl font-bold ${
                        isNegative(profit) ? 'text-red-500' : 'text-green-600'
                      } `}
                    >
                      {roi_percentage} %
                    </p>
                  </div>
                </div>
                <div className="mt-12">
                  <h3 className="text-xl font-bold">Profit</h3>
                  <p
                    className={`mt-2 text-4xl font-bold ${
                      isNegative(profit) ? 'text-red-500' : 'text-green-600'
                    }`}
                  >
                    {selectedFiatCurrency?.symbol || ''} {profit}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center">
        <p>
          <a
            className="text-sm text-gray-500 underline"
            href="http://github.com/farhankk360"
            target="_blank"
            rel="noreferrer"
          >
            farhankk360
          </a>
        </p>
      </footer>
    </div>
  )
}

export async function getServerSideProps() {
  const exchangeRateRes = await fetch(
    `${process.env.NEXT_EXCHANGE_RATE_API}/latest?base=USD`
  ).then((res) => res.json())

  const cyptoDataRes = await fetch(
    `${process.env.NEXT_COINGECKO_API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false&price_change_percentage=24h`
  ).then((res) => res.json())

  await Promise.all([exchangeRateRes, cyptoDataRes])

  return { props: { exchangeRateRes, cyptoDataRes } }
}

export default Home

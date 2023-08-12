import React, { useState, useEffect } from 'react'
import { FaTimes, FaSearch, FaChevronDown } from 'react-icons/fa'
import { Input, Modal } from '../../lib/ui_library'
import { useCryptoCurrency } from '../../lib/contexts/cryptoCurrency/cryptoCurrencyContext'
import { useFiatCurrency } from '../../lib/contexts/fiatCurrency/fiatCurrencyContext'
import { convertPriceInToFiat, isNegative } from '../../lib/helpers'
import type { CryptoCurrency } from '../../lib/types'

interface CryptoCurrencySelectorProps {}

const CryptoCurrencySelector: React.FC<CryptoCurrencySelectorProps> = (
  props
) => {
  const {
    fiatCurrencyState: { selectedFiatCurrency, fiatCurrencyExchangeRates },
  } = useFiatCurrency()
  const {
    cryptoCurrencyState: { selectedCrypto, cryptoCurrencies, priceIntoFiat },
    dispatch,
  } = useCryptoCurrency()

  const [showModal, setShowModal] = useState(false)
  const [filteredCurrencies, setFilteredCurrencies] = useState<
    CryptoCurrency[]
  >([])

  useEffect(() => {
    setFilteredCurrencies(cryptoCurrencies.slice(0, 50))
  }, [cryptoCurrencies])

  function handleModalClose() {
    setShowModal(false)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    let filtered = []

    if (value) {
      filtered = cryptoCurrencies.filter(
        (currency) =>
          currency.name.toLowerCase().includes(value.toLowerCase()) ||
          currency.symbol.toLowerCase().includes(value.toLowerCase())
      )
    } else {
      filtered = cryptoCurrencies.slice(0, 50)
    }

    setFilteredCurrencies(filtered)
  }

  function handleCurrencyClick(currency: CryptoCurrency) {
    dispatch({ type: 'set_crypto_currency', payload: currency })
    setShowModal(false)
    setFilteredCurrencies(cryptoCurrencies.slice(0, 50))
  }

  return (
    <div>
      <div>
        <p className="mb-2 text-sm text-slate-400">Choose cryptocurrency</p>
        <button
          title="Select a currency"
          className="flex items-center rounded bg-slate-600 py-2 px-4 font-medium text-white transition duration-300 hover:bg-slate-800"
          onClick={() => setShowModal(true)}
        >
          {selectedCrypto ? (
            <div className="flex items-center">
              <div className="mr-2 h-5 w-5">
                <img
                  className="w-full"
                  loading="lazy"
                  src={selectedCrypto.image}
                />
              </div>
              <p className="uppercase">{selectedCrypto.symbol}</p>
            </div>
          ) : (
            <p>--</p>
          )}
          <span className="ml-6 mr-0">
            <FaChevronDown className="h-3 w-3" />
          </span>
        </button>

        {(selectedCrypto && selectedFiatCurrency?.symbol && priceIntoFiat && (
          <p className="mt-2 text-xs text-slate-400">
            1 {selectedCrypto.symbol.toUpperCase()} ={' '}
            {selectedFiatCurrency.symbol} {priceIntoFiat}
          </p>
        )) ||
          null}
      </div>

      <Modal open={showModal} onClose={() => setShowModal(!showModal)}>
        <div className="relative my-6 mx-auto w-full max-w-2xl p-6">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-gray-100 p-6 shadow-md outline-none focus:outline-none dark:bg-[#182b3c]">
            <div className="mb-5 flex items-start justify-end rounded-t dark:border-slate-700">
              <button
                className="border-0 bg-transparent text-black dark:text-white"
                onClick={handleModalClose}
              >
                <span className="opacity-7 flex h-6 w-6 items-center rounded-full py-0 text-sm">
                  <FaTimes className="m-auto" />
                </span>
              </button>
            </div>
            <div className="relative flex-auto sm:px-10">
              <Input
                autoFocus
                onChange={handleInputChange}
                label="Search Crypto Currency"
                labelClassName="pb-5"
                type="text"
                iconRight={<FaSearch className="h-5 w-5" />}
              />
              <div
                className={`mt-10 mb-16 h-80 overflow-x-auto ${
                  filteredCurrencies.length
                    ? 'rounded border dark:border-slate-600'
                    : ''
                }`}
              >
                {(filteredCurrencies.length &&
                  filteredCurrencies.map((currency) => (
                    <div
                      className={`flex cursor-pointer items-center justify-between border-b ${
                        currency.symbol === selectedCrypto.symbol
                          ? 'bg-slate-200 dark:bg-slate-700'
                          : ''
                      } border-slate-200 px-6 py-4 hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-700`}
                      key={currency.symbol}
                      onClick={() => handleCurrencyClick(currency)}
                    >
                      <div className="flex w-full items-end justify-between">
                        <div>
                          <div className="mb-1 uppercase">
                            <strong>{currency.symbol || ''}</strong>
                          </div>
                          <p className="text-sm font-light text-black dark:text-white">
                            {currency.name}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="mb-2 text-xs font-semibold text-black dark:text-white">
                            {selectedFiatCurrency?.symbol || ''}{' '}
                            {convertPriceInToFiat(
                              selectedFiatCurrency?.code,
                              fiatCurrencyExchangeRates?.rates,
                              currency.current_price
                            )}
                          </p>
                          <p
                            className={`text-[10px] ${
                              isNegative(
                                currency.market_cap_change_percentage_24h
                              )
                                ? 'text-red-500'
                                : 'text-green-600'
                            }`}
                          >
                            {currency.market_cap_change_percentage_24h} %
                          </p>
                        </div>
                      </div>
                    </div>
                  ))) || (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm font-light text-black dark:text-white">
                      Not found
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CryptoCurrencySelector

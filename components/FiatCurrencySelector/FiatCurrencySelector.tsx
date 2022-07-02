import React, { useState } from 'react'
import { FaTimes, FaSearch } from 'react-icons/fa'
import { currencies } from '../../lib/data/currencies'
import { useFiatCurrency } from '../../lib/contexts/fiatCurrency/fiatCurrencyContext'
import { Input, Modal } from '../../lib/ui_library'
import type { FiatCurrency } from '../../lib/types'

interface FiatCurrencySelectorProps {}

const FiatCurrencySelector: React.FC<FiatCurrencySelectorProps> = (props) => {
  const {
    fiatCurrencyState: { selectedFiatCurrency, fiatCurrencyExchangeRates },
    dispatch,
  } = useFiatCurrency()

  const [showModal, setShowModal] = useState(false)
  const [filteredCurrencies, setFilteredCurrencies] = useState<FiatCurrency[]>(
    currencies.slice(0, 5) as FiatCurrency[]
  )

  function handleModalClose() {
    setShowModal(false)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    let filtered = []

    if (value) {
      filtered = currencies.filter(
        (currency) =>
          currency.code.toLowerCase().includes(value.toLowerCase()) ||
          currency.currency.toLowerCase().includes(value.toLowerCase())
      )
    } else {
      filtered = currencies.slice(0, 5)
    }

    setFilteredCurrencies(filtered)
  }

  function handleCurrencyClick(currency: FiatCurrency) {
    dispatch({ type: 'set_fiat_currency', payload: currency })
    setShowModal(false)
    setFilteredCurrencies(currencies.slice(0, 5))
  }

  return (
    <div>
      <button
        title="Select a currency"
        className="flex items-center rounded bg-green-600 py-2 px-2 font-medium text-white transition duration-300 hover:bg-green-700"
        onClick={() => setShowModal(true)}
      >
        {selectedFiatCurrency?.code}
      </button>

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
                onChange={handleInputChange}
                label="Search Fiat Currency"
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
                        currency.code === selectedFiatCurrency?.code
                          ? 'bg-slate-200 dark:bg-slate-700'
                          : ''
                      } border-slate-200 px-6 py-4 hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-700`}
                      key={currency.code}
                      onClick={() => handleCurrencyClick(currency)}
                    >
                      <div className="flex w-full items-end justify-between">
                        <div>
                          <div className="mb-1">
                            <strong>{currency.symbol || ''}</strong>
                          </div>
                          <p className="text-sm font-light text-black dark:text-white">
                            {currency.currency}
                          </p>
                        </div>

                        <p className="text-sm font-semibold text-black dark:text-white">
                          {currency.code}
                        </p>
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

export default FiatCurrencySelector

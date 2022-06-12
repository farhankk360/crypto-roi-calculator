import React, { useState } from 'react'
import { Modal } from '../'
import { FaChevronCircleDown, FaTimes } from 'react-icons/fa'

interface CurrencySelectorProps {}

const CurrencySelector: React.FC<CurrencySelectorProps> = (props) => {
  const [showModal, setShowModal] = useState(false)

  function handleModalClose() {
    setShowModal(false)
  }

  return (
    <div>
      <button
        title="Select a currency"
        className="flex items-center rounded bg-green-600 py-2 px-2 font-medium text-white transition duration-300 hover:bg-green-700"
        onClick={() => setShowModal(true)}
      >
        USD
      </button>

      <Modal open={showModal} onClose={() => setShowModal(!showModal)}>
        <div className="relative my-6 mx-auto w-full max-w-3xl p-6">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-gray-100 shadow-md shadow-lg outline-none focus:outline-none dark:bg-[#182b3c]">
            <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b p-5 dark:border-slate-700 ">
              <h3 className="font=semibold text-2xl">Choose Currency</h3>
              <button
                className="float-right border-0 bg-transparent text-black dark:text-white"
                onClick={handleModalClose}
              >
                <span className="opacity-7 block h-6 w-6 rounded-full py-0 text-sm">
                  <FaTimes />
                </span>
              </button>
            </div>
            <div className="relative flex-auto p-6">
              <form className="w-full rounded px-8 pt-6 pb-8 shadow-md">
                <label className="mb-1 block text-sm font-bold text-black">
                  First Name
                </label>
                <input className="w-full appearance-none rounded border py-2 px-1 text-black shadow" />
                <label className="mb-1 block text-sm font-bold text-black">
                  Last Name
                </label>
                <input className="w-full appearance-none rounded border py-2 px-1 text-black shadow" />
                <label className="mb-1 block text-sm font-bold text-black">
                  Address
                </label>
                <input className="w-full appearance-none rounded border py-2 px-1 text-black shadow" />
                <label className="mb-1 block text-sm font-bold text-black">
                  City
                </label>
                <input className="w-full appearance-none rounded border py-2 px-1 text-black shadow" />
              </form>
            </div>
            <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6 dark:border-slate-700">
              <button
                className="background-transparent mr-1 mb-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none focus:outline-none"
                type="button"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button
                className="mr-1 mb-1 rounded bg-yellow-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none hover:shadow-lg focus:outline-none active:bg-yellow-700"
                type="button"
                onClick={handleModalClose}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CurrencySelector

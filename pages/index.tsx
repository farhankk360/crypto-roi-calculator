import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { MainNav, CryptoCurrencySelector } from '../components'
import { Input } from '../lib/ui_library'
import { useCurrency } from '../lib/contexts/currency/currencyContext'

const Home: NextPage = () => {
  const { state, dispatch } = useCurrency()

  const currencySymbol = (
    <div className="rounded-l border border-r-0 bg-slate-600 px-4 py-2 text-white dark:border-slate-600 dark:bg-slate-700">
      {state.currency.symbol || ''}
    </div>
  )
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-200 transition-all duration-200 dark:bg-[#122334]">
      <Head>
        <title>Crypto Return on Investment Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col">
        <MainNav />

        <div className="flex flex-1 flex-col items-center justify-center px-10">
          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around rounded-xl shadow-2xl dark:bg-[#182b3c] sm:w-full">
            <div className="mt-6 mb-6 w-96 p-6 text-left">
              <CryptoCurrencySelector />

              <div className="mt-10">
                <div className="mt-6 flex">
                  {currencySymbol}
                  <Input
                    placeholder="Investment"
                    type="number"
                    inputClassName="border-l-0"
                  />
                </div>

                <div className="mt-6 flex">
                  {currencySymbol}
                  <Input
                    placeholder="Initial Price"
                    type="number"
                    inputClassName="border-l-0"
                  />
                </div>

                <div className="mt-6 flex">
                  {currencySymbol}
                  <Input
                    placeholder="Selling Price"
                    type="number"
                    inputClassName="border-l-0"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 mb-6 w-96 rounded border border-slate-700 p-6 text-left ">
              <h3 className="text-2xl font-bold">Profit</h3>
              <p className="mt-4 text-xl">
                Learn about Next.js in an interactive course with quizzes!
              </p>
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

export default Home

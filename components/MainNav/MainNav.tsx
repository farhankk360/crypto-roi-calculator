import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ThemeToggle, CurrencySelector } from '../'
import { useMediaQuery } from '../../hooks'

const links = [
  {
    name: 'ROI',
    path: '/',
  },
  {
    name: 'DCA',
    path: '/dca',
    disabled: true,
  },
]

interface MainNavProps {}

const MainNav: React.FC<MainNavProps> = (props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const isBreakpoint = useMediaQuery(768)
  const router = useRouter()

  useEffect(() => {
    setShowMobileMenu(false)
  }, [isBreakpoint])

  function toggleMobileMenu() {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <nav className="bg-gray-100 shadow-md dark:bg-[#182b3c]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex">
          <div className="flex flex-1 space-x-7">
            <div>
              <a href="/" className="flex items-center py-4 px-2">
                {/* <h3 className="mr-2 text-2xl font-bold">&#8383;</h3> */}
                <div className="mr-3 w-7">
                  <img
                    className="w-full"
                    src="/icons/icon-72x72.png"
                    alt="Crypto Roi Calculator Logo"
                  />
                </div>
                <span className="md:text-md text-xs font-semibold sm:text-lg">
                  Crypto Roi Calculator
                </span>
              </a>
            </div>

            <div className="hidden items-center space-x-1 md:flex">
              {links.map((link) =>
                !link.disabled ? (
                  <Link key={link.name} href={link.path}>
                    <a
                      className={`transition duration-300 ${
                        router.pathname == link.path
                          ? 'border-b-4 border-green-500 text-green-500'
                          : 'text-gray-500 hover:text-green-500'
                      }  py-4 px-2 font-semibold `}
                    >
                      {link.name}
                    </a>
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    className="py-4 px-2 font-semibold text-gray-300 dark:text-gray-700 "
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
          </div>

          <div className="mx-5 flex items-center space-x-3">
            <ThemeToggle />
            <CurrencySelector />
          </div>

          <div className="flex items-center md:hidden">
            <button
              className="mobile-menu-button outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className=" h-6 w-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`mobile-menu ${!showMobileMenu && 'hidden'} py-5`}>
        <ul>
          {links.map((link) => (
            <li
              key={link.name}
              className={router.pathname == link.path ? 'active' : ''}
            >
              {!link.disabled ? (
                <Link href={link.path}>
                  <a
                    className={`block ${
                      router.pathname == link.path
                        ? 'bg-green-500 text-white'
                        : ''
                    } px-2 py-4 text-sm font-semibold transition duration-300 hover:bg-green-600 hover:text-white`}
                  >
                    {link.name}
                  </a>
                </Link>
              ) : (
                <a className="disabled block bg-gray-200 px-2 py-4 text-sm font-semibold text-gray-400 dark:bg-slate-700">
                  {link.name}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default MainNav

import React, { useEffect, useState } from 'react'
import { ThemeToggle, CurrencySelector } from '../'
import { useMediaQuery } from '../../hooks'

interface MainNavProps {}

const MainNav: React.FC<MainNavProps> = (props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const isBreakpoint = useMediaQuery(768)

  useEffect(() => {
    setShowMobileMenu(false)
  }, [isBreakpoint])

  function toggleMobileMenu() {
    setShowMobileMenu(!showMobileMenu)
  }

  return (
    <nav className="bg-gray-100 shadow-md dark:bg-[#182b3c]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="#" className="flex items-center py-4 px-2">
                <h3 className="mr-2 text-2xl font-bold">&#8383;</h3>
                <span className="text-lg font-semibold">
                  Crypto Roi Calculator
                </span>
              </a>
            </div>
          </div>

          <div className="hidden items-center space-x-3 md:flex ">
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

      <div className={`mobile-menu ${!showMobileMenu && 'hidden'} p-5`}>
        <ul className="">
          <li className="active">
            <a
              href="index.html"
              className="block bg-green-500 px-2 py-4 text-sm font-semibold text-white"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="block px-2 py-4 text-sm transition duration-300 hover:bg-green-500"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="block px-2 py-4 text-sm transition duration-300 hover:bg-green-500"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block px-2 py-4 text-sm transition duration-300 hover:bg-green-500"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default MainNav

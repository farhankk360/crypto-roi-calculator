import React, { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useTheme } from 'next-themes'

interface ThemeToggleProps {}

const ThemeToggle: React.FC<ThemeToggleProps> = (props) => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const isDark = theme === 'dark' || resolvedTheme === 'dark'

  return (
    <div
      className="rounded-full p-2 transition duration-500 ease-in-out"
      title="Toggle dark mode"
    >
      {isDark ? (
        <FaSun
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="cursor-pointer text-2xl text-gray-500 dark:text-gray-400"
        />
      ) : (
        <FaMoon
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className="cursor-pointer text-2xl text-gray-500 dark:text-gray-400"
        />
      )}
    </div>
  )
}

export default ThemeToggle

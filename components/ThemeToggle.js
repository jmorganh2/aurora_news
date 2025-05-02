import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

/**
 * ThemeToggle switches between light and dark mode, persisting choice in localStorage
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  useEffect(() => {
    const root = window.document.documentElement
    const stored = window.localStorage.getItem('theme')
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const current = stored || system
    root.classList.add(current)
    setTheme(current)
  }, [])
  const toggleTheme = () => {
    const root = window.document.documentElement
    const next = theme === 'dark' ? 'light' : 'dark'
    root.classList.remove(theme)
    root.classList.add(next)
    window.localStorage.setItem('theme', next)
    setTheme(next)
  }
  return (
    <button onClick={toggleTheme} aria-label="Toggle Dark Mode" className="p-2 focus:outline-none">
      {theme === 'dark' ? (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      ) : (
        <MoonIcon className="w-6 h-6 text-gray-800" />
      )}
    </button>
  )
}
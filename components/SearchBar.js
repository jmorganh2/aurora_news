/**
 * SearchBar component with debounced onChange
 * @param {{ value: string, onChange: (value: string) => void }} props
 */
import React, { useState, useEffect } from 'react'

/**
 * SearchBar with debounced onChange
 * @param {{ value: string, onChange: (value: string) => void }} props
 */
export default function SearchBar({ value, onChange }) {
  const [input, setInput] = useState(value)
  useEffect(() => {
    setInput(value)
  }, [value])
  useEffect(() => {
    const handler = setTimeout(() => onChange(input), 300)
    return () => clearTimeout(handler)
  }, [input, onChange])
  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search articles..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  )
}
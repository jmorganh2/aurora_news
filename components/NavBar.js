import Link from 'next/link'
import { useSearch } from './SearchContext'
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'

export default function NavBar() {
  const { searchTerm, setSearchTerm } = useSearch()
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 dark:text-gray-100"
        >
          NewsFeed
        </Link>
        <div className="flex-1 mx-8">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <div className="relative">
            <button className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 focus:outline-none" />
          </div>
        </div>
      </div>
    </nav>
  )
}
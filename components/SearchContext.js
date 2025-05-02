import { createContext, useContext, useState } from 'react'

const SearchContext = createContext({
  searchTerm: '',
  setSearchTerm: term => {}
})

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}
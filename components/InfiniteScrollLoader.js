import React from 'react'

/**
 * InfiniteScrollLoader shows a spinner during data loading
 */
export default function InfiniteScrollLoader() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
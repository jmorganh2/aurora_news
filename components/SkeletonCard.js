import React from 'react'

/**
 * SkeletonCard displays a loading placeholder for NewsCard
 */
export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden">
      <div className="h-48 bg-gray-300 dark:bg-gray-700" />
      <div className="p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-1" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-1" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-4" />
      </div>
    </div>
  )
}
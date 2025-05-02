import React, { useState, useEffect, useRef } from 'react'
import NewsCard from './NewsCard'
import InfiniteScrollLoader from './InfiniteScrollLoader'

/**
 * NewsGrid displays a responsive grid of NewsCard components with infinite scroll
 * @param {{ posts: Array }} props
 */
export default function NewsGrid({ posts }) {
  const [visibleCount, setVisibleCount] = useState(6)
  const loaderRef = useRef(null)

  // Reset visible count when posts change (e.g., on search)
  useEffect(() => {
    setVisibleCount(6)
  }, [posts])

  const loadMore = () => setVisibleCount(prev => Math.min(prev + 6, posts.length))

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries[0].isIntersecting && loadMore(),
      { rootMargin: '200px' }
    )
    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => loaderRef.current && observer.unobserve(loaderRef.current)
  }, [loaderRef, posts])

  const visiblePosts = posts.slice(0, visibleCount)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {visiblePosts.map(post => (
        <NewsCard key={post.slug} post={post} />
      ))}
      {visibleCount < posts.length && (
        <div ref={loaderRef} className="col-span-full flex justify-center py-6">
          <InfiniteScrollLoader />
        </div>
      )}
    </div>
  )
}
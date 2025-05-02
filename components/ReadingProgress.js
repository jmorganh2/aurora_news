import { useState, useEffect } from 'react'

/**
 * ReadingProgress renders a progress bar at top based on scroll progress
 */
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      const percent = total > 0 ? (scrollTop / total) * 100 : 0
      setProgress(percent)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
      <div
        className="h-full bg-blue-500 dark:bg-blue-400 transition-all"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
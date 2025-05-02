import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { format } from 'date-fns'
import { BookmarkIcon, ShareIcon } from '@heroicons/react/24/outline'

/**
 * NewsCard displays an article preview with animation and actions
 * @param {{ post: { slug: string, title: string, date: string, excerpt: string, coverImage?: string } }} props
 */
export default function NewsCard({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition overflow-hidden"
    >
      <Link
        href={`/posts/${post.slug}`}
        className="block"
      >
          {post.coverImage && (
            <div className="relative h-48 w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
            </div>
          )}
          <div className="p-4">
            <h2
              className="text-lg font-semibold text-gray-900 dark:text-gray-100"
              style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {post.title}
            </h2>
            <p
              className="text-sm text-gray-500 dark:text-gray-400 mt-2"
              style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            >
              {post.excerpt}
            </p>
            <div className="mt-4 flex items-center justify-between text-gray-400 dark:text-gray-500 text-xs">
              <span>{format(new Date(post.date), 'PPP')}</span>
              <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                <BookmarkIcon className="w-5 h-5 cursor-pointer hover:text-blue-500" />
                <ShareIcon className="w-5 h-5 cursor-pointer hover:text-blue-500" />
              </div>
            </div>
          </div>
      </Link>
    </motion.div>
  )
}
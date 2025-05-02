import { useSearch } from '../components/SearchContext'
import { getSortedPostsData } from '../lib/posts'
import NewsGrid from '../components/NewsGrid'

// Fetch posts at build time for static export
export async function getStaticProps() {
  const posts = getSortedPostsData()
  return { props: { posts } }
}

export default function Home({ posts }) {
  const { searchTerm } = useSearch()
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (filteredPosts.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          No results found for "{searchTerm}"
        </p>
      </div>
    )

  return <NewsGrid posts={filteredPosts} />
}
import Link from 'next/link'

export default function ArticleCard({ title, date, excerpt, slug }) {
  return (
    <Link
      href={`/posts/${slug}`}
      className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
      <p className="mt-2 text-gray-700">{excerpt}</p>
    </Link>
  )
}
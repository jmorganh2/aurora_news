import Head from 'next/head'
import NavBar from './NavBar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Head>
        <title>News Feed</title>
        <meta name="description" content="A premium news feed application" />
      </Head>
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t mt-12">
        <div className="container mx-auto px-4 py-4 text-center text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} News Feed.
        </div>
      </footer>
    </div>
  )
}
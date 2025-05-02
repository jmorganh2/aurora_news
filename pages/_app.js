import '../styles/globals.css'
import Layout from '../components/Layout'
import { SearchProvider } from '../components/SearchContext'
import { useRouter } from 'next/router'
import { AnimatePresence, motion } from 'framer-motion'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return (
    <SearchProvider>
      <Layout>
        <AnimatePresence mode="wait" initial={false} exitBeforeEnter>
          <motion.div
            key={router.route}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </SearchProvider>
  )
}

export default MyApp
import { getAllPostSlugs, getPostData } from '../../lib/posts'
import Head from 'next/head'
import ReadingProgress from '../../components/ReadingProgress'
import { motion } from 'framer-motion'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostSlugs()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {
  return (
    <>
      <ReadingProgress />
      <Head>
        <title>{postData.title} | News Feed</title>
      </Head>
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="prose prose-lg max-w-none"
      >
        <h1>{postData.title}</h1>
        <p className="text-gray-500">
          {new Date(postData.date).toLocaleDateString()}
        </p>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </motion.article>
    </>
  )
}
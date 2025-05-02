import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/articles')

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    // Destructure frontmatter and collect other fields
    const { title: fmTitle, date: fmDate, excerpt: fmExcerpt, ...rest } = matterResult.data
    const content = matterResult.content
    // Derive title: frontmatter or first markdown heading
    let title = fmTitle
    if (!title) {
      const match = content.match(/^#\s+(.*)/m)
      title = match ? match[1].trim() : slug
    }
    // Derive date: frontmatter or file mtime
    let date = fmDate
    if (!date) {
      const stats = fs.statSync(fullPath)
      date = stats.mtime.toISOString()
    }
    // Derive excerpt: frontmatter or first 200 chars of content
    let excerpt = fmExcerpt
    if (!excerpt) {
      const body = content.replace(/^#.*\n/, '')
      excerpt = body.slice(0, 200).trim() + '...'
    }
    return {
      slug,
      title,
      date,
      excerpt,
      ...rest,
    }
  })
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()
  // Destructure frontmatter and other fields
  const { title: fmTitle, date: fmDate, excerpt: fmExcerpt, ...rest } = matterResult.data
  const content = matterResult.content
  // Derive title and date similarly
  let title = fmTitle
  if (!title) {
    const match = content.match(/^#\s+(.*)/m)
    title = match ? match[1].trim() : slug
  }
  let date = fmDate
  if (!date) {
    const stats = fs.statSync(fullPath)
    date = stats.mtime.toISOString()
  }
  // Excerpt (optional)
  let excerpt = fmExcerpt
  if (!excerpt) {
    const body = content.replace(/^#.*\n/, '')
    excerpt = body.slice(0, 200).trim() + '...'
  }
  return {
    slug,
    contentHtml,
    title,
    date,
    excerpt,
    ...rest,
  }
}
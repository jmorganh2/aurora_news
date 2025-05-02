import { getSortedPostsData } from '../../lib/posts'

export default function handler(req, res) {
  const posts = getSortedPostsData()
  res.status(200).json(posts)
}
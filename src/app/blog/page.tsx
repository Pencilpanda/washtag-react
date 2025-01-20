'use client'

import { usePosts } from '@/hooks/use-posts';
import Link from 'next/link';

export default function Blog() {
  const { posts, loading, error } = usePosts();

  if (loading) return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8">Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 font-karla">Blog</h1>
      <div className="grid gap-6">
        {posts.map((post: any) => (
          <article key={post.id} className="border rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-semibold mb-2 font-karla">{post.title.rendered}</h2>
            <div className="font-inconsolata mb-4" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            <Link href={`/blog/${post.id}`} className="text-[#1CBA8D] hover:underline font-inconsolata">
              Read More
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}


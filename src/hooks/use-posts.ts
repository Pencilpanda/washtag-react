import { useState, useEffect } from 'react';
import { getPosts } from '@/lib/api-utils';

export function usePosts(page = 1, perPage = 10) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const data = await getPosts(page, perPage);
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching posts'));
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [page, perPage]);

  return { posts, loading, error };
}


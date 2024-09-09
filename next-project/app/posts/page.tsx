'use client'
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';

const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

interface Post {
  id: number;
  title: string;
}

export default function Posts() {
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {data?.map(post => (
          <li key={post.id}>
            <Card>
              <h3>{post.title}</h3>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
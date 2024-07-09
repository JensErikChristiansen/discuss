import PostList from '@/components/posts/post-list';
import { redirect } from 'next/navigation';
import { fetchPostsBySearchTerm } from '@/db/queries/posts';

type Props = {
  searchParams: {
    term: string;
  };
};

export default function SearchPage({ searchParams: { term } }: Props) {
  if (!term) {
    redirect('/');
  }

  return (
    <div>
      <PostList fetchData={fetchPostsBySearchTerm.bind(null, term)} />
    </div>
  );
}

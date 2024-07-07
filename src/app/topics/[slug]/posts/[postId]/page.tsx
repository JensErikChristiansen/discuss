import Link from 'next/link';
import Post from '@/components/posts/post';
import CommentList from '@/components/comments/comment-list';
import CreateCommentForm from '@/components/comments/create-comment-form';
import paths from '@/paths';
import { fetchCommentsByPostId } from '@/db/queries/comments';

type Props = {
  params: {
    slug: string;
    postId: string;
  };
};

export default async function PostPage({ params }: Props) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.showTopic(slug)}>
        {'< '}Back to {slug}
      </Link>
      <Post postId={postId} />
      <CreateCommentForm postId={postId} startOpen />
      <CommentList fetchData={fetchCommentsByPostId.bind(null, postId)} />
    </div>
  );
}

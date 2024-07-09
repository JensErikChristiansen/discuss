import Link from 'next/link';
import Post from '@/components/posts/post';
import CommentList from '@/components/comments/comment-list';
import CreateCommentForm from '@/components/comments/create-comment-form';
import paths from '@/paths';
import { fetchCommentsByPostId } from '@/db/queries/comments';
import { Suspense } from 'react';
import PostSkeleton from '@/components/posts/post-skeleton';

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
      <Suspense fallback={<PostSkeleton />}>
        <Post postId={postId} />
      </Suspense>
      <CreateCommentForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}

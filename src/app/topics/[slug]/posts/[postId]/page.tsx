import Link from 'next/link';
import Post from '@/components/posts/post';
import CommentList from '@/components/comments/comment-list';
import CreateCommentForm from '@/components/comments/create-comment-form';
import paths from '@/paths';

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.showTopic(slug)}>
        {'< '}Back to {slug}
      </Link>
      <Post postId={postId} />
      <CreateCommentForm postId={postId} startOpen />
      {/* <CommentList comments={comments} /> */}
    </div>
  );
}

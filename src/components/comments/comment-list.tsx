import Comment from '@/components/comments/comment';
import { CommentListData } from '@/db/queries/comments';

interface CommentListProps {
  fetchData: () => Promise<CommentListData[]>;
}

// TODO: Get a list of comments from somewhere
export default async function CommentList({ fetchData }: CommentListProps) {
  const comments = await fetchData();

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null,
  );

  const renderedComments = topLevelComments.map((comment) => {
    return (
      <Comment key={comment.id} commentId={comment.id} comments={comments} />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}

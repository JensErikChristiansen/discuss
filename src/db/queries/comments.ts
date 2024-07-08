import type { Comment } from '@prisma/client';
import { db } from '@/db';
import { cache } from 'react';

export type CommentListData = Comment & {
  user: {
    name: string | null;
    image: string | null;
  };
};

export const fetchCommentsByPostId = cache(
  (postId: string): Promise<CommentListData[]> => {
    console.log('making a query', postId);
    return db.comment.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
    });
  },
);

import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostListData = Post & {
  topic: {
    slug: string;
  };
  user: {
    name: string | null;
  };
  _count: {
    comments: number;
  };
};

export function fetchPostsBySearchTerm(term: string): Promise<PostListData[]> {
  return db.post.findMany({
    where: {
      OR: [
        {
          title: { contains: term },
        },
        {
          content: { contains: term },
        },
      ],
    },
    include: {
      topic: {
        select: { slug: true },
      },
      user: {
        select: { name: true, image: true },
      },
      _count: {
        select: { comments: true },
      },
    },
  });
}

export function fetchPostsByTopicSlug(slug: string): Promise<PostListData[]> {
  return db.post.findMany({
    where: {
      topic: {
        slug,
      },
    },
    include: {
      topic: {
        select: { slug: true },
      },
      user: {
        select: { name: true },
      },
      _count: {
        select: { comments: true },
      },
    },
  });
}

export function fetchTopPosts(): Promise<PostListData[]> {
  return db.post.findMany({
    orderBy: {
      comments: {
        _count: 'desc',
      },
    },
    take: 5,
    include: {
      topic: {
        select: { slug: true },
      },
      user: {
        select: { name: true, image: true },
      },
      _count: {
        select: { comments: true },
      },
    },
  });
}

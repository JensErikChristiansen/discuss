'use server';

import { revalidatePath } from 'next/cache';
import paths from '@/paths';
import { db } from '@/db';
import { Post } from '@prisma/client';
import { auth } from '@/auth';
import { z } from 'zod';
import { redirect } from 'next/navigation';

type FormState = {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
};

const schema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

export default async function createPost(
  slug: string,
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be logged in to create a post'],
      },
    };
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const validation = schema.safeParse({ title, content });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  let post: Post;

  try {
    const topic = await db.topic.findFirst({
      where: {
        slug,
      },
    });

    if (!topic) {
      throw new Error('Topic not found');
    }

    post = await db.post.create({
      data: {
        title,
        content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    }

    return {
      errors: {
        _form: ['An unknown error occurred'],
      },
    };
  }

  revalidatePath(paths.showTopic(slug));
  redirect(paths.showPost(slug, post.id));
}

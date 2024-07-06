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
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const validation = schema.safeParse({ title, content });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  return {
    errors: {},
  };
  // revalidatePath(paths.showTopic());
}

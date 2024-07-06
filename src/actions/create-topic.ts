'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { db } from '@/db';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import paths from '@/paths';
import { Topic } from '@prisma/client';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message: 'Must be lower case letters or dashes without spaces',
    }),
  description: z.string().min(10),
});

type FormState = {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
};

export default async function createTopic(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be logged in to create a topic.'],
      },
    };
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  const validation = createTopicSchema.safeParse({
    name,
    description,
  });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  let topic: Topic; // why create a variable? why not just use the name variable above in the redirect?

  try {
    topic = await db.topic.create({
      data: {
        slug: validation.data.name,
        description: validation.data.description,
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
        _form: ['Something went wrong'],
      },
    };
  }

  revalidatePath(paths.home());
  redirect(paths.showTopic(topic.slug));
}

'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { useFormState } from 'react-dom';
import { db } from '@/db';

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
  };
};

export default async function createTopic(
  formState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const validation = createTopicSchema.safeParse({ name, description });

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
    };
  }

  return {
    errors: {},
  };

  // db.topic.create({
  //   slug: name,
  //   description,
  // });

  revalidatePath('/');
}

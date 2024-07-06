'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
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

export default async function createTopic(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const validation = createTopicSchema.safeParse({ name, description });

  if (!validation.success) {
    console.log(validation.error.flatten().fieldErrors);
  }

  // db.topic.create({
  //   slug: name,
  //   description,
  // })

  revalidatePath('/');
}

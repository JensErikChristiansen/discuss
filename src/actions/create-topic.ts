'use server';

import { revalidatePath } from 'next/cache';

export default async function createTopic(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  revalidatePath('/');
}

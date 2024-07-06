import { db } from '@/db';
import Link from 'next/link';
import { Chip } from '@nextui-org/react';
import paths from '@/paths';

export default async function TopicList() {
  const topics = await db.topic.findMany();

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {topics.map((t) => (
        <Link key={t.id} href={paths.showTopic(t.slug)}>
          <Chip color="warning" variant="shadow">
            {t.slug}
          </Chip>
        </Link>
      ))}
    </div>
  );
}

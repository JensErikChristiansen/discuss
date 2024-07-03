'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Profile() {
  const session = useSession();

  if (!session.data || !session.data.user) {
    return <div>From client: user is NOT signed in</div>;
  }

  const user = session.data.user;

  return (
    <div>
      {user.image && (
        <Image
          src={user.image}
          alt="avatar"
          width="100"
          height="100"
          className="rounded-full border"
        />
      )}

      <pre>
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
    </div>
  );
}

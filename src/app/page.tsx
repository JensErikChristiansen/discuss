import { Button } from '@nextui-org/react';
import { auth } from '@/auth';
import * as actions from '@/actions';
import Image from 'next/image';
import Profile from '@/components/profile';

export default async function Home() {
  const session = await auth();

  function Session() {
    if (!session || !session.user) {
      return <p>Signed Out</p>;
    }

    return (
      <div>
        {session.user.image && (
          <Image
            src={session.user.image}
            alt="avatar"
            width="100"
            height="100"
            className="rounded-full border"
          />
        )}

        <pre>
          <code>{JSON.stringify(session.user, null, 2)}</code>
        </pre>
      </div>
    );
  }

  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {/* <Session /> */}
      <Profile />
    </div>
  );
}

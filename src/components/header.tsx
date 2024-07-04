import Link from 'next/link';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';

import { auth } from '@/auth';

// import { useSession } from 'next-auth/react';

export default async function Header() {
  const session = await auth();

  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Discuss
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <Input placeholder="Search" />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          {session?.user ? <Button>Sign Out</Button> : <Button>Sign in</Button>}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

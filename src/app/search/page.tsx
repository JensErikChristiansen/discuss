import { redirect } from 'next/navigation';

type Props = {
  searchParams: {
    term: string;
  };
};

export default function SearchPage({ searchParams: { term } }: Props) {
  if (!term) {
    redirect('/');
  }

  return <div>{term}</div>;
}

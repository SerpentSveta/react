'use client';

import { useParams } from 'next/navigation';
import { Search } from '../../components/Search/Search';

export default function SearchPage() {
  const params = useParams();
  const page = params.pageNumber || '1';

  return <Search initialPage={Number(page)} />;
}

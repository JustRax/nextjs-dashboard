import { fetchFilteredCustomers } from '@/app/lib/data';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import CustomersTable from '@/app/ui/customers/table';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  // Await the searchParams Promise
  const params = await searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page) || 1;

  const customers = await fetchFilteredCustomers(query);

  return (
    <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
      <CustomersTable customers={customers} />
    </Suspense>
  );
}
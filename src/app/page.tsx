import { Suspense } from 'react';
import FilterBar from '../_components/FilterBar';
import JobsContainer from '../_components/JobsContainer';
import ClientWrapper from '../_components/ClientWrapper';
import { searchJobsWithFilters, getJobsPaginated } from '@/_lib/data-service';

interface SearchParams {
  search?: string;
  location?: string;
  fullTime?: string;
  page?: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // Await searchParams in Next.js 15
  const params = await searchParams;

  // Extract filters from URL
  const filters = {
    searchTerm: params.search || '',
    location: params.location || '',
    fullTime: params.fullTime === 'true',
  };

  // Check if any filters are applied
  const hasFilters = filters.searchTerm || filters.location || filters.fullTime;

  // Get initial data based on URL filters
  const initialData = hasFilters
    ? await searchJobsWithFilters(filters, 0, 12)
    : await getJobsPaginated(0, 12);

  return (
    <ClientWrapper initialFilters={filters}>
      <div className="min-h-screen bg-background">
        <div className="-mt-10 pb-12 relative z-10">
          <Suspense fallback={<div>Loading filters...</div>}>
            <FilterBar />
          </Suspense>
        </div>
        <main className="relative z-10 mt-8 md:mt-16 mb-40">
          <JobsContainer initialData={initialData} />
        </main>
      </div>
    </ClientWrapper>
  );
}

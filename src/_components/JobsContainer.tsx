'use client';

import { useEffect } from 'react';
import { PaginatedJobsResponse } from '@/_lib/data-service';
import JobGrid from './JobGrid';
import { useFilter } from '@/_components/filter-context';

interface JobsContainerProps {
  initialData: PaginatedJobsResponse;
}

export default function JobsContainer({ initialData }: JobsContainerProps) {
  const { filteredJobs, hasMore, isLoading, loadMoreJobs, setInitialData } =
    useFilter();

  // Initialize with initial data
  useEffect(() => {
    setInitialData(initialData);
  }, [initialData, setInitialData]);

  return (
    <div className="space-y-12 max-w-6xl mx-auto ">
      <JobGrid jobs={filteredJobs} />

      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={loadMoreJobs}
            disabled={isLoading}
            className="px-8 py-4 bg-[#5964E0] text-white font-bold text-body rounded-md hover:bg-light-violet transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}

      {!isLoading && filteredJobs.length === 0 && (
        <div className="text-center text-dark-grey">
          <p>No jobs found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

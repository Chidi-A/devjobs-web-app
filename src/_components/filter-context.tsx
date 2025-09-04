'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { JobWithCompany } from '@/types/job';
import {
  searchJobsWithFilters,
  PaginatedJobsResponse,
} from '@/_lib/data-service';
import { useRouter, useSearchParams } from 'next/navigation';

// Filter state interface
export interface FilterState {
  searchTerm: string;
  location: string;
  fullTime: boolean;
}

// Context interface
interface FilterContextType {
  filters: FilterState;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  filteredJobs: JobWithCompany[];
  hasMore: boolean;
  isLoading: boolean;
  totalCount: number;
  currentPage: number;
  searchJobs: (page?: number) => Promise<void>;
  loadMoreJobs: () => Promise<void>;
  resetJobs: () => void;
  setInitialData: (data: PaginatedJobsResponse) => void;
}

// Create context
const FilterContext = createContext<FilterContextType | undefined>(undefined);

// Provider component
export function FilterProvider({
  children,
  initialFilters,
}: {
  children: ReactNode;
  initialFilters: FilterState;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL-driven filter state
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // UI state managed by context
  const [filteredJobs, setFilteredJobs] = useState<JobWithCompany[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // Update URL parameters
  const updateURL = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams(searchParams);

      // Update URL parameters
      if (newFilters.searchTerm) {
        params.set('search', newFilters.searchTerm);
      } else {
        params.delete('search');
      }

      if (newFilters.location) {
        params.set('location', newFilters.location);
      } else {
        params.delete('location');
      }

      if (newFilters.fullTime) {
        params.set('fullTime', 'true');
      } else {
        params.delete('fullTime');
      }

      // Reset page when filters change
      params.delete('page');

      // Navigate to new URL
      const newURL = params.toString() ? `/?${params.toString()}` : '/';
      router.push(newURL);
    },
    [router, searchParams]
  );

  // Update filters (this will trigger URL update)
  const updateFilters = useCallback(
    (newFilters: Partial<FilterState>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      updateURL(updatedFilters);
    },
    [filters, updateURL]
  );

  // Set initial data
  const setInitialData = useCallback((data: PaginatedJobsResponse) => {
    setFilteredJobs(data.jobs);
    setHasMore(data.hasMore);
    setTotalCount(data.totalCount);
    setCurrentPage(0);
  }, []);

  // Search jobs with current filters
  const searchJobs = useCallback(
    async (page: number = 0) => {
      setIsLoading(true);
      try {
        const response: PaginatedJobsResponse = await searchJobsWithFilters(
          filters,
          page,
          12
        );

        if (page === 0) {
          // Reset jobs for new search
          setFilteredJobs(response.jobs);
          setCurrentPage(0);
        } else {
          // Append jobs for pagination
          setFilteredJobs((prev) => [...prev, ...response.jobs]);
          setCurrentPage(page);
        }

        setHasMore(response.hasMore);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error('Error searching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [filters]
  );

  // Load more jobs
  const loadMoreJobs = useCallback(async () => {
    if (isLoading || !hasMore) return;
    await searchJobs(currentPage + 1);
  }, [isLoading, hasMore, currentPage, searchJobs]);

  // Reset jobs (clear filters)
  const resetJobs = useCallback(() => {
    setFilteredJobs([]);
    setHasMore(false);
    setTotalCount(0);
    setCurrentPage(0);
  }, []);

  const value = {
    filters,
    updateFilters,
    filteredJobs,
    hasMore,
    isLoading,
    totalCount,
    currentPage,
    searchJobs,
    loadMoreJobs,
    resetJobs,
    setInitialData,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}

// Custom hook to use the filter context
export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
}

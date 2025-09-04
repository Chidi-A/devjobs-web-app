'use client';

import { ReactNode } from 'react';
import { FilterProvider, FilterState } from './filter-context';

interface ClientWrapperProps {
  children: ReactNode;
  initialFilters?: FilterState;
}

export default function ClientWrapper({ 
  children, 
  initialFilters = { searchTerm: '', location: '', fullTime: false }
}: ClientWrapperProps) {
  return (
    <FilterProvider initialFilters={initialFilters}>
      {children}
    </FilterProvider>
  );
}

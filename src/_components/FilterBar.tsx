'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import SearchInput from './SearchInput';
import LocationInput from './LocationInput';
import FullTimeCheckbox from './FullTimeCheckbox';
import SearchButton from './SearchButton';
import { FilterState, useFilter } from '@/_components/filter-context';

function MobileFilterModal({
  isOpen,
  onClose,
  filters,
  onLocationChange,
  onFullTimeChange,
  onSearch,
}: {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onLocationChange: (value: string) => void;
  onFullTimeChange: (value: boolean) => void;
  onSearch: (value: string) => void;
}) {
  if (!isOpen) return null;

  const handleSearch = () => {
    onSearch(filters.searchTerm);
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[87%] max-w-sm bg-[var(--filter-bg)] rounded-lg p-6 space-y-6 shadow-2xl">
        {/* Location Input */}
        <div>
          <LocationInput
            placeholder="Filter by location..."
            value={filters.location}
            onLocationChange={onLocationChange}
          />
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[var(--divider-color)] opacity-20" />

        {/* Full Time Checkbox */}
        <div>
          <FullTimeCheckbox
            checked={filters.fullTime}
            onFullTimeChange={onFullTimeChange}
          />
        </div>

        {/* Search Button */}
        <div className="pt-2">
          <button
            onClick={handleSearch}
            className="w-full px-8 py-4 bg-[#5964E0] text-white font-medium rounded-lg hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-light-violet focus:ring-opacity-50"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : null;
}

export default function FilterBar() {
  const { filters, updateFilters, searchJobs } = useFilter();
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  const handleSearch = () => {
    // Trigger a new search with current filters
    searchJobs(0);
  };

  const handleSearchTermChange = (value: string) => {
    updateFilters({ searchTerm: value });
  };

  const handleLocationChange = (value: string) => {
    updateFilters({ location: value });
  };

  const handleFullTimeChange = (value: boolean) => {
    updateFilters({ fullTime: value });
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="bg-[var(--filter-bg)] rounded-lg h-20 transition-colors duration-300">
          {/* Mobile Layout */}
          <div className="flex md:hidden items-center h-full px-6 gap-4">
            {/* Search Input - takes most space */}
            <div className="flex-1">
              <SearchInput
                placeholder="Filter by title..."
                value={filters.searchTerm}
                onSearch={handleSearchTermChange}
              />
            </div>

            {/* Filter Icon Button */}
            <button
              onClick={() => setIsMobileModalOpen(true)}
              className="flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center  transition-colors duration-200"
            >
              <Image
                src="/icon-filter.svg"
                alt="Filter"
                width={20}
                height={20}
              />
            </button>

            {/* Search Button */}
            <div className="flex-shrink-0">
              <button
                onClick={handleSearch}
                className="px-[14px] py-[14px] bg-[#5964E0] text-white font-medium rounded-lg hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-light-violet focus:ring-opacity-50"
              >
                <Image
                  src="/icon-search.svg"
                  alt="Search"
                  width={20}
                  height={20}
                  className="brightness-0 invert"
                />
              </button>
            </div>
          </div>

          {/* Tablet & Desktop Layout */}
          <div className="hidden md:flex items-center justify-between gap-2 lg:gap-4 h-full px-2 lg:px-6">
            {/* Search Input */}
            <div className="flex-1">
              {/* Tablet placeholder */}
              <div className="block lg:hidden">
                <SearchInput
                  placeholder="Filter by title..."
                  value={filters.searchTerm}
                  onSearch={handleSearchTermChange}
                />
              </div>
              {/* Desktop placeholder */}
              <div className="hidden lg:block">
                <SearchInput
                  placeholder="Filter by title, companies, expertise..."
                  value={filters.searchTerm}
                  onSearch={handleSearchTermChange}
                />
              </div>
            </div>

            {/* Divider 1 */}
            <div className="w-px self-stretch bg-[var(--divider-color)] opacity-20"></div>

            {/* Location Input */}
            <div className="flex-1">
              <LocationInput
                placeholder="Filter by location..."
                value={filters.location}
                onLocationChange={handleLocationChange}
              />
            </div>

            {/* Divider 2 */}
            <div className="w-px self-stretch bg-[var(--divider-color)] opacity-20"></div>

            {/* Full Time Checkbox */}
            <div className="w-auto flex-shrink-0">
              <FullTimeCheckbox
                checked={filters.fullTime}
                onFullTimeChange={handleFullTimeChange}
              />
            </div>

            {/* Search Button */}
            <div className="w-auto flex-shrink-0 ml-2 lg:ml-4">
              <SearchButton onClick={handleSearch} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <MobileFilterModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        filters={filters}
        onLocationChange={handleLocationChange}
        onFullTimeChange={handleFullTimeChange}
        onSearch={handleSearch}
      />
    </>
  );
}

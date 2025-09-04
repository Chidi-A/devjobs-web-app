'use client';

import SearchInput from './SearchInput';
import LocationInput from './LocationInput';
import FullTimeCheckbox from './FullTimeCheckbox';
import SearchButton from './SearchButton';
import { useFilter } from '@/_components/filter-context';

export default function FilterBar() {
  const { filters, updateFilters, searchJobs } = useFilter();

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
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="bg-[var(--filter-bg)] rounded-lg h-20 transition-colors duration-300">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 h-full px-6">
          {/* Search Input */}
          <div className="w-full lg:flex-1">
            <SearchInput
              placeholder="Filter by title, companies, expertise..."
              value={filters.searchTerm}
              onSearch={handleSearchTermChange}
            />
          </div>

          {/* Divider 1 */}
          <div className="hidden lg:block w-px self-stretch bg-[var(--divider-color)] opacity-20"></div>

          {/* Location Input */}
          <div className="w-full lg:flex-1">
            <LocationInput
              placeholder="Filter by location..."
              value={filters.location}
              onLocationChange={handleLocationChange}
            />
          </div>

          {/* Divider 2 */}
          <div className="hidden lg:block w-px self-stretch bg-[var(--divider-color)] opacity-20"></div>

          {/* Full Time Checkbox */}
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <FullTimeCheckbox
              checked={filters.fullTime}
              onFullTimeChange={handleFullTimeChange}
            />
          </div>

          {/* Search Button */}
          <div className="w-full lg:w-auto lg:flex-shrink-0 lg:ml-4">
            <SearchButton onClick={handleSearch} />
          </div>
        </div>
      </div>
    </div>
  );
}

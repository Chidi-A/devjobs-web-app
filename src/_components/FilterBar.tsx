'use client';

import { useState } from 'react';
import SearchInput from './SearchInput';
import LocationInput from './LocationInput';
import FullTimeCheckbox from './FullTimeCheckbox';
import SearchButton from './SearchButton';

export default function FilterBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [fullTime, setFullTime] = useState(false);

  const handleSearch = () => {
    const filters = {
      search: searchTerm,
      location,
      fullTime,
    };

    console.log('Search filters:', filters);
    // TODO: Implement search functionality
    // You can call an API, update global state, etc.
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="bg-very-dark-blue rounded-lg h-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 h-full px-6">
          {/* Search Input */}
          <div className="w-full lg:flex-1">
            <SearchInput
              placeholder="Filter by title, companies, expertise..."
              onSearch={setSearchTerm}
            />
          </div>

          {/* Divider 1 */}
          <div
            className="hidden lg:block w-px self-stretch opacity-20"
            style={{ backgroundColor: '#6e8098' }}
          ></div>

          {/* Location Input */}
          <div className="w-full lg:flex-1">
            <LocationInput
              placeholder="Filter by location..."
              onLocationChange={setLocation}
            />
          </div>

          {/* Divider 2 */}
          <div
            className="hidden lg:block w-px self-stretch opacity-20"
            style={{ backgroundColor: '#6e8098' }}
          ></div>

          {/* Full Time Checkbox */}
          <div className="w-full lg:w-auto lg:flex-shrink-0">
            <FullTimeCheckbox onFullTimeChange={setFullTime} />
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

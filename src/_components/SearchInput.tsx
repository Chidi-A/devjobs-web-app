'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SearchInputProps {
  placeholder: string;
  onSearch: (value: string) => void;
}

export default function SearchInput({
  placeholder,
  onSearch,
}: SearchInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Image
            src="/icon-search.svg"
            alt="Search"
            width={20}
            height={20}
            className="text-light-violet"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 bg-very-dark-blue text-white placeholder-gray rounded-lg border-none focus:outline-none "
        />
      </div>
    </form>
  );
}

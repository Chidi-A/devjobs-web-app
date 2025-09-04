'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface SearchInputProps {
  placeholder: string;
  onSearch: (value: string) => void;
  value?: string;
}

export default function SearchInput({
  placeholder,
  onSearch,
  value: externalValue = '',
}: SearchInputProps) {
  const [internalValue, setInternalValue] = useState(externalValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with external value when it changes (e.g., from URL)
  useEffect(() => {
    setInternalValue(externalValue);
  }, [externalValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for debounced search
    timeoutRef.current = setTimeout(() => {
      onSearch(newValue);
    }, 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear timeout and search immediately
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    onSearch(internalValue);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex-1">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Image
            src="/icon-search.svg"
            alt="Search"
            width={20}
            height={20}
            className="opacity-75"
          />
        </div>
        <input
          type="text"
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 bg-[var(--input-bg)] text-[var(--input-text)] border-none focus:outline-none transition-colors duration-300"
        />
      </div>
    </form>
  );
}

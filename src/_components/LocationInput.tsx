'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface LocationInputProps {
  placeholder: string;
  onLocationChange: (value: string) => void;
  value?: string;
}

export default function LocationInput({
  placeholder,
  onLocationChange,
  value: externalValue = '',
}: LocationInputProps) {
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

    // Set new timeout for debounced location change
    timeoutRef.current = setTimeout(() => {
      onLocationChange(newValue);
    }, 300);
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
    <div className="relative">
      <div className="absolute inset-y-0 left-0  flex items-center pointer-events-none">
        <Image
          src="/icon-location.svg"
          alt="Location"
          width={20}
          height={20}
          className="opacity-75"
          style={{ width: 'auto', height: 'auto' }}
        />
      </div>
      <input
        type="text"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-8 pr-4 py-4 bg-[var(--input-bg)] text-[var(--input-text)] border-none focus:outline-none transition-colors duration-300"
      />
    </div>
  );
}

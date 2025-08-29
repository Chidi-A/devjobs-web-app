'use client';

import { useState } from 'react';
import Image from 'next/image';

interface LocationInputProps {
  placeholder: string;
  onLocationChange: (value: string) => void;
}

export default function LocationInput({
  placeholder,
  onLocationChange,
}: LocationInputProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onLocationChange(newValue);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Image
          src="/icon-location.svg"
          alt="Location"
          width={20}
          height={20}
          className="text-light-violet"
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 bg-very-dark-blue text-white placeholder-gray rounded-lg border-none focus:outline-none "
      />
    </div>
  );
}

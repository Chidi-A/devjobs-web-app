'use client';

import { useState } from 'react';

interface FullTimeCheckboxProps {
  onFullTimeChange: (isFullTime: boolean) => void;
}

export default function FullTimeCheckbox({
  onFullTimeChange,
}: FullTimeCheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onFullTimeChange(newChecked);
  };

  return (
    <div className="flex items-center space-x-3">
      <div
        className="w-5 h-5 rounded cursor-pointer transition-colors duration-200 flex items-center justify-center"
        style={{
          backgroundColor: isChecked ? '#5964E0' : '#313743',
        }}
        onClick={handleChange}
      >
        {isChecked && (
          <svg
            className="w-3 h-3"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 3L4.5 8.5L2 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-white font-bold">Full Time Only</span>
    </div>
  );
}

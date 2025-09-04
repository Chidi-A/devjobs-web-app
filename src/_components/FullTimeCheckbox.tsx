'use client';

import { useState, useEffect } from 'react';

interface FullTimeCheckboxProps {
  onFullTimeChange: (isFullTime: boolean) => void;
  checked?: boolean;
}

export default function FullTimeCheckbox({
  onFullTimeChange,
  checked = false,
}: FullTimeCheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  // Sync with external checked state when it changes (e.g., from URL)
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onFullTimeChange(newChecked);
  };

  return (
    <div className="flex items-center space-x-3">
      <div
        className={`w-5 h-5 rounded cursor-pointer transition-colors duration-300 flex items-center justify-center ${
          isChecked ? 'bg-[#5964E0]' : 'bg-[var(--checkbox-bg)]'
        }`}
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
      <span className="text-[var(--checkbox-text)] font-bold transition-colors duration-300">
        Full Time Only
      </span>
    </div>
  );
}

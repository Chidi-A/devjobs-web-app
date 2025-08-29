'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // You can add theme switching logic here later
  };

  return (
    <header className="h-[10.125rem] bg-[#19202d] relative overflow-hidden rounded-bl-[100px]">
      {/* Background pattern overlay */}
      <Image
        src="/header-bg.svg"
        alt="Header background"
        fill
        className="object-cover"
        priority
      />

      {/* Top padding container */}
      <div className="pt-[2.8125rem] relative z-10">
        {/* Main container */}
        <div className="max-w-[80rem] mx-auto px-[5%] h-full flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Image
              src="/devjobs-logo.svg"
              alt="devjobs"
              width={115}
              height={32}
              className="h-8 w-auto"
            />
          </div>

          {/* Right side - Theme toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {/* Sun icon */}
              <Image
                src="/sun.svg"
                alt="Sun icon"
                width={20}
                height={18.6}
                className="text-white"
              />

              {/* Toggle switch */}
              <button
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                  isDarkMode ? 'bg-[#939bf4]' : 'bg-white'
                }`}
              >
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-[#5964E0] translate-x-6'
                      : 'bg-[#5964E0] translate-x-[5px]'
                  }`}
                />
              </button>

              {/* Moon icon */}
              <Image
                src="/moon.svg"
                alt="Moon icon"
                width={12}
                height={12}
                className="text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from './theme-context';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

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
            <Link href="/">
              <Image
                src="/devjobs-logo.svg"
                alt="devjobs"
                width={115}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Right side - Theme toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {/* Sun icon */}
              <Image
                src="/sun.svg"
                alt="Sun icon"
                width={20}
                height={19} // Changed from 18.6 to maintain aspect ratio
                className={`text-white transition-opacity duration-200 ${
                  isDarkMode ? 'opacity-50' : 'opacity-100'
                }`}
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
                className={`text-white transition-opacity duration-200 ${
                  isDarkMode ? 'opacity-100' : 'opacity-50'
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

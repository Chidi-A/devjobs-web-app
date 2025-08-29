interface SearchButtonProps {
  onClick: () => void;
}

export default function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="px-8 py-4 bg-[#5964E0] text-white font-medium rounded-lg hover:bg-opacity-90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-light-violet focus:ring-opacity-50"
    >
      Search
    </button>
  );
}

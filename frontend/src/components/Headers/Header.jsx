import { ArrowRight } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-[#354f52] w-full h-20 py-6 px-8 md:px-16 lg:px-24">
      <div className="max-w-[1440px] mx-auto flex items-center justify-center md:justify-between gap-4 h-full">
        <h1 className="font-['Inter'] font-extrabold text-white text-3xl md:text-4xl">
          SafaBin
        </h1>
        <div className="flex items-center gap-6">
          <button className="text-white font-['Inter'] font-medium text-lg md:text-xl hover:opacity-80 transition-opacity">
            Sign Up
          </button>
          <button className="bg-white text-[#354f52] px-7 py-3 rounded-[20px] font-['Inter'] font-medium text-lg hover:bg-opacity-90 transition-all">
            Log In
          </button>
        </div>
      </div>
    </header>
  );
}

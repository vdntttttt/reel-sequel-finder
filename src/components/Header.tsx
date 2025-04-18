
import React from 'react';
import { LucideInstagram } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-brand-purple font-bold text-2xl">Part</span>
        <span className="text-brand-pink font-bold text-2xl">TWO</span>
      </div>
      <a 
        href="https://www.instagram.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        <LucideInstagram size={24} />
      </a>
    </header>
  );
};

export default Header;

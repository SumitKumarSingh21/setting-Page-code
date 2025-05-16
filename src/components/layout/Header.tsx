
import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const Header = () => {
  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          CarMod
        </Link>
        
        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <Input placeholder="Search settings..." className="w-full" />
        </div>
      </div>
    </header>
  );
};

export default Header;

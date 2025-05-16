
import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          CarMod
        </Link>
        
        {/* Desktop Search - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <Input placeholder="Search settings..." className="w-full pl-9" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Header;

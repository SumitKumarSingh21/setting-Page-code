
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Wrench, MessageCircle, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-10 md:hidden">
      <div className="flex justify-around items-center p-2">
        <NavLink
          to="/"
          className={({ isActive }) => cn(
            "flex flex-col items-center p-2 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </NavLink>
        
        <NavLink
          to="/services"
          className={({ isActive }) => cn(
            "flex flex-col items-center p-2 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Wrench className="h-5 w-5" />
          <span className="text-xs mt-1">Services</span>
        </NavLink>
        
        <NavLink
          to="/chat"
          className={({ isActive }) => cn(
            "flex flex-col items-center p-2 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-xs mt-1">Chatbot</span>
        </NavLink>
        
        <NavLink
          to="/community"
          className={({ isActive }) => cn(
            "flex flex-col items-center p-2 transition-colors",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Users className="h-5 w-5" />
          <span className="text-xs mt-1">Community</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileNavbar;

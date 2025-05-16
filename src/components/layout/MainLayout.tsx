
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import MobileNavbar from './MobileNavbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <MobileNavbar />
    </div>
  );
};

export default MainLayout;

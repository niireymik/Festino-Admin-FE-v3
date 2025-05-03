import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const DefaultLayout: React.FC = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/login';

  return (
    <div
      id="container"
      className="grid grid-cols-1 md:grid-cols-[minmax(50px,_1fr)_minmax(auto,_1680px)_minmax(50px,_1fr)] xl:grid-cols-[minmax(220px,_1fr)_minmax(auto,_1680px)_minmax(220px,_1fr)] grid-rows-[60px_1fr_180px] min-h-screen w-full gap-0"
    >
      {/* Header */}
      <div className="col-span-1 md:col-span-3 h-[60px]">
        {!hideNavBar && <NavBar />}
      </div>

      {/* Left Side Bar */}
      <div className="min-w-[50px] hidden md:block"></div>

      {/* Main Section */}
      <div className="overflow-x-auto">
        <Outlet />
      </div>

      {/* Right Side Bar */}
      <div className="min-w-[50px] hidden md:block"></div>

      {/* Footer */}
      <div className="col-span-1 md:col-span-3 h-[180px]">
        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/SideBar';
import Navbar from '../component/Navbar';
// import Navbar from './Navbar';

export default function ClientLayout() {
  // const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarCollapsed(!isSidebarCollapsed);
  // };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <main className={`flex-1 overflow-y-auto transition-all duration-300 `}>
          <div className="mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

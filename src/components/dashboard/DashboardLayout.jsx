import React from 'react'
import { Outlet } from 'react-router-dom';
import SideBar from './Sidebar';

const DashboardLayout = () => {
    return (
        <div className="flex items-center h-auto md:h-screen max-w-8xl mx-auto overflow-hidden">
          <div className="w-[0%] lg:w-[20%] h-full">
            <SideBar />
          </div>
          <div className="flex flex-col items-center w-full lg:w-[80%] h-full">
            <div className="bg-slate-100 w-full h-screen">
              <Outlet />
            </div>
          </div>
        </div>
      );
}

export default DashboardLayout

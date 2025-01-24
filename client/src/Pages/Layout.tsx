import Sidebar from '@/components/Nav2';
import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar  />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar  />
        <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

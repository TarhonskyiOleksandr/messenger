import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useHomeLayout } from '../../hooks';

const HomeLayout: React.FC = () => {
  useHomeLayout()

  return (
    <div>
      <Navbar />
      <main className='h-[calc(100vh-76px)] grid grid-cols-[3fr_9fr]'>
        <Sidebar />
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;

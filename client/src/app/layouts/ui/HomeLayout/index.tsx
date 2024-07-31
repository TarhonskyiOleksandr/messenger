import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useHomeLayout } from '../../hooks';

const HomeLayout: React.FC = () => {
  const { isLoading } = useHomeLayout();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) return null;

  return (
    <div>
      <Navbar />
      <main className={`grid h-[calc(100vh-76px)] lg:grid-cols-[3fr_9fr] grid-cols-[${isExpanded? '1fr' : '3fr_9fr'}]`}>
        <Sidebar
          setIsExpanded={setIsExpanded}
          isExpanded={isExpanded}
        />
        {!isExpanded ? <Outlet /> : null}
      </main>
    </div>
  );
};

export default HomeLayout;

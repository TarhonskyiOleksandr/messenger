import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useHomeLayout } from '../../hooks';

const HomeLayout: React.FC = () => {
  const { isLoading } = useHomeLayout();
  const [isExpanded, setIsExpanded] = useState(false);

  if (isLoading) return null;

  const getColsClass = () => {
    if (isExpanded) return 'grid-cols-[1fr]';
    return 'grid-cols-[3fr_9fr]';
  };

  return (
    <div>
      <Navbar />
      <main className={`grid h-[calc(100vh-76px)] ${getColsClass()}`}>
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

import React from 'react';

import { DirectsList } from '@/features/directs';

const Sidebar: React.FC = () => {
  return (
    <aside className='flex w-full pt-4 bg-gray-700'>
      <div className="px-3 w-full">
        <h2 className="ml-5 mb-5 text-white font-semibold text-lg">
          Direct Messages
        </h2>
        <DirectsList />
      </div>
    </aside>
  );
};

export default Sidebar;

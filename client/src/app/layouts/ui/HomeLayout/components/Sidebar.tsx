import React from 'react';

import { DirectsList } from '@/features/directs';

const Sidebar: React.FC = () => {
  return (
    <aside className='flex pt-4 bg-gray-700 overflow-x-hidden'>
      <div className="w-full px-3">
        <h2 className="ml-5 mb-5 text-white font-semibold text-lg">
          Direct Messages
        </h2>
        <DirectsList />
      </div>
    </aside>
  );
};

export default Sidebar;

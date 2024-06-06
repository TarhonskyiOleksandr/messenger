import React, { useState } from 'react';

import { DirectsList } from '@/features/directs';
import { SearchBar, SearchResutls } from '@/features/search';

const Sidebar: React.FC = () => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <aside className='flex pt-4 bg-gray-700 overflow-x-hidden'>
      <div className="w-full px-3">
        <SearchBar
          onSetSearch={setIsSearch}
          isSearch={isSearch}
        />
        <DirectsList isSearch={isSearch} />
        <SearchResutls isSearch={isSearch} />
      </div>
    </aside>
  );
};

export default Sidebar;

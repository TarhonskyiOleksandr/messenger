import React, { useState } from 'react';
import { ArrowRight2 } from 'iconsax-react';

import { DirectsList } from '@/features/directs';
import { SearchBar, SearchResutls } from '@/features/search';

const Sidebar:
  React.FC<{
    setIsExpanded: (cb: boolean | ((value: boolean) => boolean)) => void,
    isExpanded: boolean,
  }> = ({ setIsExpanded, isExpanded }) => {
  const [isSearch, setIsSearch] = useState(false);

  return (
    <aside className={`flex pt-4 bg-gray-700 overflow-x-hidden md:w-full ${isExpanded ? 'w-full' : 'w-[94px]'}`}>
      <div className="w-full px-3">
        <button
          className={`block ${isExpanded ? 'ml-auto' : 'mx-auto'} md:hidden mb-2`}
          onClick={() => setIsExpanded((prev: boolean) => !prev)}
        >
          <ArrowRight2
            size="18"
            color="#fff"
          />
        </button>
        <SearchBar
          onSetSearch={setIsSearch}
          isSearch={isSearch}
        />
        <DirectsList
          isSearch={isSearch}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
        <SearchResutls isSearch={isSearch} />
      </div>
    </aside>
  );
};

export default Sidebar;

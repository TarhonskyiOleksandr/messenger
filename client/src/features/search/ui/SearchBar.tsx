import {
  ChangeEvent,
  FC,
  useEffect,
  useState
} from 'react';
import { ArrowLeft } from 'iconsax-react';

import { useAppDispatch } from '@/shared/store';
import { clearResults, search } from '@/entities/search';

interface ISearchBar {
  onSetSearch: (val: boolean) => void;
  isSearch: boolean;
}

const SearchBar: FC<ISearchBar> = ({ onSetSearch, isSearch }) => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const handleSearch = async(e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
  };

  const handleGoBack = () => {
    setQuery('');
    onSetSearch(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) dispatch(search({ userName: query }));
      dispatch(clearResults());
    }, 1000);

    return () => clearTimeout(delayDebounceFn)
  }, [query, dispatch]);

  return (
    <div className="py-4 flex relative">
      <button
        onClick={handleGoBack}
        className={`p-0 absolute top-1/2 transform -translate-y-1/2 ${isSearch ? 'block' : 'hidden'}`}
      >
        <ArrowLeft
          size="24"
          color="#FFF"
        />
      </button>
      <input
        value={query}
        placeholder="Search..."
        className={`transition-all ${isSearch ? 'ml-9' : 'ml-0'}`}
        onChange={handleSearch}
        onFocus={() => onSetSearch(true)}
      />
    </div>
  );
};

export default SearchBar;

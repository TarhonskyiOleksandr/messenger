import { FC } from "react";

import { selectSearchResult } from "@/entities/search";
import { useAppSelector } from "@/shared/store";
import { DirectItem } from "@/shared/ui";

const SearchResutls: FC<{ isSearch: boolean }> = ({ isSearch }) => {
  const { data, loading, error } = useAppSelector(selectSearchResult);

  if ((loading || error) || !data._id) return null;

  return (
    <div className={isSearch ? 'block' : 'hidden'}>
      <DirectItem
        id={data._id}
        name={data.userName}
      />
    </div>
  );
};

export default SearchResutls;

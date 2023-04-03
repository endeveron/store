import { useEffect, useState } from 'react';

import { ViewHeader } from 'components';
import {
  ProductSearchOutput,
  SearchForm,
  SearchResult,
  useLazySearchQuery,
} from 'features/product';

import './Search.scss';

const Search = () => {
  const [search, { data, isLoading }] = useLazySearchQuery();

  const [searchOutput, setSearchOutput] = useState<ProductSearchOutput>();

  const handleFormSubmit = (query: string) => {
    search(query);
  };

  const handleClearResult = () => {
    setSearchOutput({
      data: {
        products: [],
      },
      isCleared: true,
    });
  };

  useEffect(() => {
    data &&
      setSearchOutput({
        data,
        isCleared: false,
      });
  }, [data]);

  return (
    <div className="search view">
      <ViewHeader>
        <SearchForm
          onSubmit={handleFormSubmit}
          onClear={handleClearResult}
          isLoading={isLoading}
        />
      </ViewHeader>
      <div className="search__content view-content">
        <SearchResult output={searchOutput} />
      </div>
    </div>
  );
};

export { Search };

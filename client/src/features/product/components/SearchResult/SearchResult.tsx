import { ProductSearchOutput, SearchResultItem } from 'features/product';

import './SearchResult.scss';

type SearchResultProps = {
  output: ProductSearchOutput | undefined;
};

const SearchResult = ({ output }: SearchResultProps) => {
  if (!output) return null;

  const data = output.data;

  if (!data?.products?.length && !output.isCleared)
    return (
      <div className="search-result__message">There are no items found.</div>
    );

  return (
    <div className="search-result">
      {data.products?.map((itemData) => (
        <SearchResultItem data={itemData} key={itemData._id} />
      ))}
    </div>
  );
};

export { SearchResult };

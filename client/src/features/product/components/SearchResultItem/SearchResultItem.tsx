import { addServerUrl } from 'common/utils/url';
import { Product, useProduct } from 'features/product';

import './SearchResultItem.scss';

type SearchResultItemProps = {
  data: Product;
};

const SearchResultItem = ({ data }: SearchResultItemProps) => {
  const { openProductDetails } = useProduct();

  const handleItemClick = () => {
    const colorId = data.colors[0]._id;
    colorId && openProductDetails({ product: data, colorId });
  };

  const imageSrc = addServerUrl(data.colors[0].images[0]);

  return (
    <div onClick={handleItemClick} className="search-result-item">
      <div className="search-result-item__image">
        <img src={imageSrc} alt={data.title} />
      </div>
      <div className="search-result-item__title">{data.title}</div>
    </div>
  );
};

export { SearchResultItem };

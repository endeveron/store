import { useEffect, useState } from 'react';

import {
  CategoryList,
  Product,
  ProductList,
  useGetProductsQuery,
} from 'features/product';

import './ProductContainer.scss';
import { Loading } from 'components';

const ProductContainer = () => {
  const { data: fetchedItems, isLoading } = useGetProductsQuery({});
  const [items, setItems] = useState<Product[]>([]);

  const handleCategoryChange = (categoryId: string) => {
    const filteredItems = fetchedItems?.filter((item) =>
      item.categories.includes(categoryId)
    );
    if (filteredItems) setItems(filteredItems);
  };

  useEffect(() => {
    fetchedItems?.length && setItems(fetchedItems);
  }, [fetchedItems]);

  const loadingEl = (
    <div className="product-container__loading">
      <Loading />
    </div>
  );

  return (
    <div className="product-container fade">
      <CategoryList onChange={handleCategoryChange} />
      <div className="product-container__list-wrapper view-content">
        {isLoading ? loadingEl : <ProductList items={items} />}
      </div>
    </div>
  );
};

export { ProductContainer };

import { Product, ProductItem } from 'features/product';

import './ProductList.scss';

const ProductList = ({ items }: { items: Product[] }) => (
  <section className="product-list fade">
    {items.map((item) => (
      <ProductItem data={item} key={item._id} />
    ))}
  </section>
);

export { ProductList };

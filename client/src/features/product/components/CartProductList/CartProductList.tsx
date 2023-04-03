import {
  CartProductItem,
  CartProductItemHandlerProps,
  ICartProductItem,
} from 'features/product';

import './CartProductList.scss';

type CartProductListProps = {
  items: ICartProductItem[];
  onDecrease: (props: CartProductItemHandlerProps) => void;
  onIncrease: (props: CartProductItemHandlerProps) => void;
  onRemove: (props: CartProductItemHandlerProps) => void;
};

const CartProductList = ({
  items,
  onDecrease,
  onIncrease,
  onRemove,
}: CartProductListProps) => {
  if (!items?.length) return null;

  return (
    <div className="cart-product-list">
      {items.map((data) => (
        <CartProductItem
          data={data}
          onDecrease={onDecrease}
          onIncrease={onIncrease}
          onRemove={onRemove}
          key={data._id + data.color._id}
        />
      ))}
    </div>
  );
};

export { CartProductList };

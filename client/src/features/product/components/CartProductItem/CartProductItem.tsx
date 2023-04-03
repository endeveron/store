import classNames from 'classnames';

import { addServerUrl } from 'common/utils/url';
import {
  CartProductItemHandlerProps,
  ICartProductItem,
  useGetProductsQuery,
  useProduct,
} from 'features/product';
import { AddIconSmall, CloseIconSmall, RemoveIconSmall } from 'assets/ui';

import './CartProductItem.scss';

type CartProductItemProps = {
  data: ICartProductItem;
  onDecrease: (props: CartProductItemHandlerProps) => void;
  onIncrease: (props: CartProductItemHandlerProps) => void;
  onRemove: (props: CartProductItemHandlerProps) => void;
};

const CartProductItem = ({
  data,
  onDecrease,
  onIncrease,
  onRemove,
}: CartProductItemProps) => {
  const { _id, color, price, quantity, title } = data;

  const { data: products } = useGetProductsQuery({});
  const { openProductDetails } = useProduct();

  const handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
    // Go to the product details view if e.target has 'open-details' className
    const openDetails = (e.target as HTMLElement).classList.contains(
      'open-details'
    );
    if (openDetails && products?.length) {
      // Get the product data
      const updProducts = [...products];
      const index = updProducts.findIndex((product) => product._id === _id);
      if (index < 0) return;
      const product = updProducts[index];
      const colorId = color._id;
      // Open product/:id
      product && colorId && openProductDetails({ product, colorId });
    }
  };

  const handlerProps = { productId: _id, colorId: color._id };

  const handleIncreaseQuantity = () => {
    onIncrease(handlerProps);
  };

  const handleDecreaseQuantity = () => {
    if (quantity < 2) return;
    onDecrease(handlerProps);
  };

  const handleRemoveItem = () => {
    onRemove(handlerProps);
  };

  const getImageSrc = (): string => addServerUrl(color.images[0]);
  const imageSrc = getImageSrc();

  return (
    <div className="cart-item" onClick={handleItemClick}>
      <div className="cart-item__image">
        <img className="open-details" src={imageSrc} alt={title} />
      </div>
      <div className="cart-item__content">
        <div className="cart-item__content-row">
          <div className="cart-item__title open-details">{title}</div>
          <CloseIconSmall
            onClick={handleRemoveItem}
            className="cart-item__remove icon icon--action"
          />
        </div>
        <div className="cart-item__content-row cart-item__color open-details">
          {color.title}
        </div>
        <div className="cart-item__content-row">
          <div className="cart-item__quantity">
            <div
              className={classNames('cart-item__quantity-decrease', {
                disabled: quantity < 2,
              })}
            >
              <RemoveIconSmall
                onClick={handleDecreaseQuantity}
                className="cart-item__icon cart-item__icon--remove icon icon--action"
              />
            </div>
            <div className="cart-item__quantity-value">{quantity}</div>
            <div className="cart-item__quantity-increase">
              <AddIconSmall
                onClick={handleIncreaseQuantity}
                className="cart-item__icon cart-item__icon--add icon icon--action"
              />
            </div>
          </div>
          <div className="cart-item__price">
            <span className="cart-item__currency">$</span>
            <span className="cart-item__price-value">{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CartProductItem };

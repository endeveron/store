import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components';
import {
  CartProductItemHandlerProps,
  CartProductList,
  ICartProductItem,
  selectCart,
  setCartProductItems,
  useProduct,
} from 'features/product';
import { useAppSelector } from 'store';

import './CartProductContainer.scss';

const CartProductContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getCartProductItem } = useProduct();
  const { items } = useAppSelector(selectCart);

  let updItems: ICartProductItem[];
  const isItems = !!items?.length;

  const handleExit = () => {
    navigate('/');
  };

  const decreaseProductItemQuantity = ({
    productId,
    colorId,
  }: CartProductItemHandlerProps) => {
    const { index, cartItem } = getCartProductItem({
      items,
      productId,
      colorId,
    });
    if (cartItem) {
      updItems = [...items];
      const updCartProductItem = { ...cartItem };
      updCartProductItem.quantity -= 1;
      updItems[index] = updCartProductItem;
      dispatch(setCartProductItems(updItems));
    }
  };

  const increaseProductItemQuantity = ({
    productId,
    colorId,
  }: CartProductItemHandlerProps) => {
    const { index, cartItem } = getCartProductItem({
      items,
      productId,
      colorId,
    });
    if (cartItem) {
      updItems = [...items];
      const updCartProductItem = { ...cartItem };
      updCartProductItem.quantity += 1;
      updItems[index] = updCartProductItem;
      dispatch(setCartProductItems(updItems));
    }
  };

  const removeProductItem = ({
    productId,
    colorId,
  }: CartProductItemHandlerProps) => {
    if (items?.length === 1) {
      return dispatch(setCartProductItems([]));
    }

    const { cartItem } = getCartProductItem({ items, productId, colorId });
    if (cartItem) {
      updItems = [...items].filter(
        (item) => item._id !== productId || item.color._id !== colorId
      );
      dispatch(setCartProductItems(updItems));
    }
  };

  return (
    <div className="cart-product-container">
      {isItems ? (
        <CartProductList
          items={items}
          onDecrease={decreaseProductItemQuantity}
          onIncrease={increaseProductItemQuantity}
          onRemove={removeProductItem}
        />
      ) : (
        <div className="cart-product-container__no-items">
          <div className="cart-product-container__message">
            Your cart is empty
          </div>
          <div className="cart-product-container__button">
            <Button onClick={handleExit} variant="contained">
              Buy something
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export { CartProductContainer };

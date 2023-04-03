import { Dispatch, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Cart,
  ICartProductItem,
  Product,
  ProductColor,
  ProductDetails,
  selectCart,
  setCartProductItems,
  setProductDetails,
} from 'features/product';
import { useAppDispatch, useAppSelector } from 'store';

interface AddToCartProps {
  cart: Cart;
  item: Product;
  curColor: ProductColor;
}

interface AddToCartAction {
  payload: ICartProductItem[];
  type: string;
}

interface GetCartProductItemProps {
  items: ICartProductItem[];
  productId: string;
  colorId: string;
}

const useProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items } = useAppSelector(selectCart);

  const [cartPrice, setCartPrice] = useState<number>(0);

  const getCartProductItem = ({
    items,
    productId,
    colorId,
  }: GetCartProductItemProps): {
    index: number;
    cartItem: ICartProductItem | undefined;
  } => {
    let cartItem;
    const updItems = [...items];
    const index = updItems.findIndex(
      (item) => item._id === productId && item.color._id === colorId
    );

    if (index > -1) {
      cartItem = updItems[index];
    }

    return {
      index,
      cartItem,
    };
  };

  const addToCart =
    ({ cart, item, curColor }: AddToCartProps) =>
    (dispatch: Dispatch<AddToCartAction>) => {
      // Configure cartItem data
      const cartItem: ICartProductItem = {
        _id: item._id,
        color: curColor,
        price: item.price,
        quantity: 1,
        title: item.title,
      };

      // Add cartItem to the cart
      const updItems = [...cart.items];
      const { index, cartItem: createdItem } = getCartProductItem({
        items: updItems,
        productId: item._id,
        colorId: curColor._id,
      });

      if (index < 0) {
        // Add a new one
        updItems.push(cartItem);
      } else {
        // Update the existing cart item
        if (createdItem) {
          const updItem = { ...createdItem };
          updItem.quantity += 1;
          updItems[index] = updItem;
        }
      }

      if (updItems) dispatch(setCartProductItems(updItems));
    };

  const openProductDetails = (productDetails: ProductDetails): void => {
    // Set the redux state.product.details data
    dispatch(setProductDetails(productDetails));
    // Navigate to product/:id
    navigate(`/product/${productDetails.product._id}`);
  };

  useEffect(() => {
    const total = items.reduce((total, item) => {
      return (total += item.price * item.quantity);
    }, 0);

    setCartPrice(total);
  }, [items]);

  return { cartPrice, addToCart, getCartProductItem, openProductDetails };
};

export { useProduct };

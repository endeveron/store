import { useNavigate } from 'react-router-dom';

import { Button, useActionModalWindow, ViewHeader } from 'components';
import { selectAuthToken } from 'features/auth';
import { CartProductContainer, selectCart, useProduct } from 'features/product';
import { useAppSelector } from 'store';

import './Cart.scss';

const Cart = () => {
  const navigate = useNavigate();

  const { items } = useAppSelector(selectCart);
  const token = useAppSelector(selectAuthToken);

  const { cartPrice } = useProduct();
  const { showActionModalWindow, ActionModalWindow } = useActionModalWindow();

  const isItems = !!items?.length;

  const handleActionModalAccept = () => {
    navigate('/login', { state: { to: { pathname: '/checkout' } } });
  };

  const handleBuy = () => {
    if (token) {
      navigate('/checkout');
    }
    showActionModalWindow({
      title: 'Please Log In',
      message: 'You have to be logged in to continue',
      btnText: 'Login',
      // secondBtnText: 'Fast Checkout',
    });
  };

  const handleExit = () => {
    navigate('/');
  };

  const cartSummary = isItems && (
    <div className="cart-product-container__summary">
      <span className="cart-product-container__summary-title">Total price</span>
      <span className="cart-product-container__summary-currency">$</span>
      <span className="cart-product-container__summary-value">{cartPrice}</span>
    </div>
  );

  const cartButtons = isItems && (
    <div className="cart__buttons">
      <Button onClick={handleExit} className="cart__exit">
        Continue shopping
      </Button>
      <Button onClick={handleBuy} className="cart__buy" variant="contained">
        Checkout
      </Button>
    </div>
  );

  return (
    <div className="cart view">
      {!token && <ActionModalWindow onAcceptCb={handleActionModalAccept} />}
      <ViewHeader title="Cart" />

      <div className="cart__content view-content">
        <CartProductContainer />
        {cartSummary}
        {cartButtons}
      </div>
    </div>
  );
};

export { Cart };

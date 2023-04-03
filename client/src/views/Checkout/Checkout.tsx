import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useError } from 'common/hooks/useError';
import { Button, Loading, ViewHeader } from 'components';
import {
  CartProductContainer,
  CheckoutShippingForm,
  ShippingFormData,
  Order,
  resetCart,
  selectCart,
  useProduct,
  useCreateOrderMutation,
} from 'features/product';
import { selectUserAccount, selectUserId } from 'features/user';
import { useAppSelector } from 'store';

import './Checkout.scss';

type CheckoutContentBoxProps = {
  title: string;
  children: ReactElement<any, any>;
  showPaper?: boolean;
};

const CheckoutContentBox = ({
  title,
  children,
  showPaper,
}: CheckoutContentBoxProps) => (
  <div className="checkout__content-box">
    <h2 className="checkout__subtitle">{title}</h2>

    {showPaper ? (
      <div className="checkout__content-box__content">{children}</div>
    ) : (
      children
    )}
  </div>
);

type CheckoutSummaryRowProps = {
  title: string;
  price: number;
};

const CheckoutSummaryRow = ({ title, price }: CheckoutSummaryRowProps) => (
  <div className="checkout__row">
    <div className="checkout__prop-title">{title}</div>
    <div className="checkout__prop-value">
      <span className="checkout__currency">$</span>
      <span className="checkout__price">{price}</span>
    </div>
  </div>
);

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleApiError } = useError();
  const { cartPrice } = useProduct();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const userAccData = useAppSelector(selectUserAccount);
  const { items: productsInCart } = useAppSelector(selectCart);
  const userId = useAppSelector(selectUserId);

  const [shippingData, setShippingData] = useState<ShippingFormData>();
  const [shippingPrice, setshippingPrice] = useState(0);

  const totalPrice = cartPrice + shippingPrice;

  const handleShippingFormSubmit = (shippingData: ShippingFormData) => {
    setShippingData(shippingData);
    setshippingPrice(50);
  };

  const handlePay = async () => {
    // Payment info
    // console.log('userAccData', userAccData);
    // console.log('shippingData', shippingData);
    // console.log('productsInCart', productsInCart);
    // console.log('totalPrice', totalPrice);

    if (
      !productsInCart?.length ||
      !userAccData?.name ||
      !userAccData?.email ||
      !shippingData ||
      !totalPrice
    ) {
      return;
    }

    const products = productsInCart.map((product) => ({
      ...product,
      color: {
        title: product.color.title,
        code: product.color.code,
      },
    }));

    const order: Order = {
      products,
      user: {
        _id: userId,
        name: userAccData.name,
        email: userAccData.email,
      },
      shipping: {
        price: shippingPrice * 100,
        ...shippingData,
      },
      cartPrice: cartPrice * 100,
      totalPrice: totalPrice * 100,
    };

    console.log('order', order);
    // TODO: Send order data to the server
    try {
      const data: Order = await createOrder(order).unwrap();

      console.log('data', data);

      // If success
      dispatch(resetCart());
      navigate('/success', { state: { orderNumber: data.number } });
    } catch (err: any) {
      handleApiError(err);
    }
  };

  const contactEl = (
    <div className="checkout__contact">
      <div className="checkout__user-name checkout__row">
        <div className="checkout__prop-title">Name</div>
        <div className="checkout__prop-value">{userAccData?.name}</div>
      </div>
      <div className="checkout__email checkout__row">
        <div className="checkout__prop-title">Email</div>
        <div className="checkout__prop-value">{userAccData?.email}</div>
      </div>
    </div>
  );

  const shippingEl = (
    <div className="checkout__shipping">
      <CheckoutShippingForm onSubmitted={handleShippingFormSubmit} />
    </div>
  );

  const checkoutContentBoxes: CheckoutContentBoxProps[] = [
    {
      title: 'Contact',
      children: contactEl,
      showPaper: true,
    },
    {
      title: 'Shipping',
      children: shippingEl,
      showPaper: true,
    },
    {
      title: 'Products',
      children: <CartProductContainer />,
    },
  ];

  const summaryRows: CheckoutSummaryRowProps[] = [
    {
      title: 'Price',
      price: cartPrice,
    },
    {
      title: 'Shipping',
      price: shippingPrice,
    },
    {
      title: 'Total',
      price: totalPrice,
    },
  ];

  return (
    <div className="checkout">
      <ViewHeader title="Checkout" navbackPath="/cart" />

      <div className="checkout__content view-content">
        {checkoutContentBoxes?.map((data) => (
          <CheckoutContentBox
            title={data.title}
            showPaper={data.showPaper}
            key={data.title}
          >
            {data.children}
          </CheckoutContentBox>
        ))}

        <div className="checkout__summary">
          <h2 className="checkout__subtitle">Summary</h2>
          <div className="checkout__summary__content">
            <div className="checkout__summary__rows">
              {summaryRows?.map((data) => (
                <CheckoutSummaryRow
                  title={data.title}
                  price={data.price}
                  key={data.title}
                />
              ))}
            </div>

            <div className="checkout__summary__action">
              {isLoading ? (
                <div className="checkout__loading">
                  <Loading />
                </div>
              ) : (
                <Button
                  onClick={handlePay}
                  className="checkout__buy"
                  variant="contained"
                  disabled={!shippingData}
                >
                  Pay
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Checkout };

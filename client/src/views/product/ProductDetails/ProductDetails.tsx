import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'store';
import {
  Product,
  ProductColor,
  ProductDetails as IProductDetails,
  selectCart,
  selectProductDetails,
  useProduct,
} from 'features/product';
import { addServerUrl } from 'common/utils/url';
import { Button, Slider, ViewHeader } from 'components';

import { FavoriteIcon, ShoppingCartIcon } from 'assets/ui';

import './ProductDetails.scss';

const ProductDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { addToCart } = useProduct();

  let productDetails: IProductDetails | null;

  // The product id can be used for opening an external links
  // let { id } = useParams();

  const cart = useAppSelector(selectCart);
  productDetails = useAppSelector(selectProductDetails);

  const [curColor, setCurColor] = useState<ProductColor | null>(null);
  const [data, setData] = useState<Product | null>(null);

  const colors = data?.colors;

  const setColor = useCallback(
    (colorId: string): void => {
      if (!colors?.length) return;

      const newColor = colors.find(
        (item) => item._id.toString() === colorId.toString()
      );
      newColor && setCurColor(newColor);
    },
    [colors]
  );

  const handleColorClick = (colorId: string): void => {
    setColor(colorId);
  };

  const handleAddToCart = (): void => {
    if (!data || !curColor) return;

    // Add to cart
    dispatch(addToCart({ cart, item: data, curColor }));

    // Navigate to cart
    navigate('/cart');
  };

  useEffect(() => {
    if (!productDetails) {
      // Fetch product by id
    }

    const product = productDetails?.product;
    const colorId = productDetails?.colorId;

    if (product && colorId) {
      // Init the product data
      setData(product);

      // Init the current color
      setColor(colorId);
    }
  }, [productDetails, setColor]);

  const renderCurrentColorEl = (isForLargeScreens?: boolean) => {
    const colorTitle = curColor?.title;
    if (!colorTitle) return null;
    return (
      <div
        className={classNames('product-details__current-color', {
          'for-large-screens': isForLargeScreens,
        })}
      >
        {colorTitle}
      </div>
    );
  };

  const currentColorEl = renderCurrentColorEl();
  const currentColorElForLargeScreens = renderCurrentColorEl(true);

  const renderColorStack = () => {
    const rendderColorPaletteEl = () => {
      if (!colors?.length || colors.length < 2) return null;

      return (
        <div className="product-details__color-palette">
          {colors?.map((item) => {
            return (
              <div
                onClick={() => handleColorClick(item._id)}
                className={classNames('product-details__color', {
                  current: item._id === curColor?._id,
                })}
                style={{ backgroundColor: item.code }}
                key={item._id}
              ></div>
            );
          })}
        </div>
      );
    };

    const colorPaletteEl = rendderColorPaletteEl();

    return (
      <>
        {currentColorEl}
        {colorPaletteEl}
      </>
    );
  };

  const colorStackEl = renderColorStack();

  if (!data) return null;

  const { price, specification, title } = data;

  const configureSliderData = () => {
    const imageSrcArr = curColor?.images;
    if (!imageSrcArr?.length) return null;

    const images = imageSrcArr.map((src) => ({
      src: addServerUrl(src),
      alt: title,
    }));

    return {
      title,
      images,
    };
  };

  const sliderData = configureSliderData();

  return (
    <div className="product-details view">
      <ViewHeader title={title} />

      <div className="product-details__content view-content">
        <div className="product-details__col">
          <div className="product-details__slider">
            {sliderData && <Slider {...sliderData} />}
          </div>
          <div className="product-details__color-stack">{colorStackEl}</div>
        </div>
        <div className="product-details__col">
          <div className="product-details__specification">
            {specification?.full}
          </div>

          {currentColorElForLargeScreens}

          <div className="product-details__content-stack">
            <div className="product-details__price">
              <span className="product-details__currency">$</span>
              <span className="product-details__price-value">{price}</span>
            </div>
            <FavoriteIcon className="product-details__like icon icon--action" />
            <Button
              onClick={handleAddToCart}
              className="product-details__buy"
              variant="contained"
              startIcon={
                <ShoppingCartIcon className="product-details__buy icon icon--inverse" />
              }
            >
              Buy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductDetails };

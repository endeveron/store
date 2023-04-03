import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { addServerUrl } from 'common/utils/url';
import {
  Product,
  ProductColor,
  selectCart,
  useProduct,
} from 'features/product';
import { useAppDispatch, useAppSelector } from 'store';
import { CheckmarkIcon, FavoriteIcon, ShoppingCartIcon } from 'assets/ui';

import './ProductItem.scss';

type ProductItemProps = {
  data: Product;
};

const ProductItem = ({ data }: ProductItemProps) => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector(selectCart);
  const { addToCart, openProductDetails } = useProduct();

  const [curColor, setCurColor] = useState<ProductColor | null>(null);
  const [showCheckmark, setShowCheckmark] = useState(false);

  const timerRef: React.MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  > = useRef(undefined);

  const { colors, price, title, specification } = data;

  const handleAddToCart = (): void => {
    if (!data || !curColor) return;

    // Add to cart
    dispatch(addToCart({ cart, item: data, curColor }));
    setShowCheckmark(true);

    timerRef.current = setTimeout(() => {
      setShowCheckmark(false);
    }, 1500);
  };

  const handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
    // Go to the product details view if e.target has 'open-details' className
    const openDetails = (e.target as HTMLElement).classList.contains(
      'open-details'
    );
    if (openDetails) {
      const colorId = curColor?._id;
      colorId && openProductDetails({ product: data, colorId });
    }
  };

  const handleColorClick = (itemId: string): void => {
    const newCurColor = colors.find(
      (item) => item._id.toString() === itemId.toString()
    );
    newCurColor && setCurColor(newCurColor);
  };

  useEffect(() => {
    colors?.length && setCurColor(colors[0]);
  }, [colors]);

  const getImagePath = () => {
    const imagePath = curColor?.images[0];
    return imagePath ? addServerUrl(imagePath) : '';
  };

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  const renderColorPalette = () =>
    colors.map((item) => (
      <div
        onClick={() => handleColorClick(item._id)}
        className="product-item__color action"
        style={{ backgroundColor: item.code }}
        key={item._id}
      ></div>
    ));

  const colorPaletteEl = renderColorPalette();

  return (
    <div className="product-item" onClick={handleItemClick}>
      <div className="product-item__image fade">
        <img className="open-details" src={getImagePath()} alt={title} />
      </div>
      <div className="product-item__color-palette">{colorPaletteEl}</div>
      <div className="product-item__title open-details">{title}</div>
      <div className="product-item__specification open-details">
        {specification?.short}
      </div>
      <div className="product-item__content-stack">
        <div className="product-item__price">
          <span className="product-item__currency">$</span>
          <span className="product-item__price-value">{price}</span>
        </div>
        <FavoriteIcon className="product-item__like icon icon--action" />
        <div
          onClick={handleAddToCart}
          className={classNames('product-item__buy', {
            'product-item__buy--checkmark': showCheckmark,
          })}
        >
          {showCheckmark ? (
            <CheckmarkIcon className="product-item__icon icon icon--action" />
          ) : (
            <ShoppingCartIcon className="product-item__icon icon icon--action" />
          )}
        </div>
      </div>
    </div>
  );
};

export { ProductItem };

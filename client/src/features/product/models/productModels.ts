export type ProductColor = {
  _id: string;
  code: string;
  images: string[];
  title: string;
};

export interface ProductItem
  extends Omit<
    Product,
    'description' | 'likes' | 'categories' | 'colors' | 'rate' | 'specification'
  > {
  quantity: number;
}

export interface CartProductItem extends ProductItem {
  color: ProductColor;
}

export interface OrderProductItem extends ProductItem {
  color: {
    code: string;
    title: string;
  };
}

export interface Cart {
  items: CartProductItem[];
}

export type CartProductItemHandlerProps = {
  productId: string;
  colorId: string;
};

type Like = {
  userId: string;
};

export interface ShippingFormData {
  city: string;
  address: string;
}

export interface ShippingData extends ShippingFormData {
  price: number;
}

// @see server\models\product.js
export interface Product {
  _id: string;
  title: string;
  categories: string[];
  colors: ProductColor[];
  description: string;
  specification: {
    short: string;
    full: string;
  };
  likes: Like[];
  price: number;
  rate: number;
}

// @see server\models\order.js
export interface Order {
  cartPrice: number;
  shipping: ShippingData;
  products: OrderProductItem[];
  totalPrice: number;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  _id?: string;
  date?: string;
  number?: number;
}

export interface ProductDetails {
  product: Product;
  colorId: string;
}

// @see server\models\category.js
export interface Category {
  _id: string;
  icon: string;
  title: string;
}

export interface ProductSearchRes {
  // categories: Category[];
  products: Product[];
}

export interface ProductSearchOutput {
  data: ProductSearchRes;
  isCleared: boolean;
}

// redux

export interface ProductSlice {
  details: ProductDetails | null;
  cart: Cart;
}

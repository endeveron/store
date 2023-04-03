export type {
  Cart,
  CartProductItem as ICartProductItem,
  CartProductItemHandlerProps,
  Category,
  ShippingFormData,
  Order,
  Product,
  ProductColor,
  ProductDetails,
  ProductSlice,
  ProductSearchRes,
  ProductSearchOutput,
} from './models/productModels';

export {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetProductQuery,
  useGetProductsQuery,
  useLazySearchQuery,
  useCreateOrderMutation,
} from './services/productApi';

export { useProduct } from './hooks/useProduct';

export {
  productReducer,
  resetCart,
  resetProductState,
  selectCart,
  selectProductDetails,
  setCartProductItems,
  setProductDetails,
} from './store/productSlice';

export { CategoryItem } from './components/CategoryItem/CategoryItem';
export { CategoryList } from './components/CategoryList/CategoryList';
export { CartProductContainer } from './components/CartProductContainer/CartProductContainer';
export { CartProductItem } from './components/CartProductItem/CartProductItem';
export { CartProductList } from './components/CartProductList/CartProductList';
export { CheckoutShippingForm } from './components/CheckoutShippingForm/CheckoutShippingForm';
export { ProductContainer } from './components/ProductContainer/ProductContainer';
export { ProductItem } from './components/ProductItem/ProductItem';
export { ProductList } from './components/ProductList/ProductList';
export { SearchForm } from './components/SearchForm/SearchForm';
export { SearchResult } from './components/SearchResult/SearchResult';
export { SearchResultItem } from './components/SearchResultItem/SearchResultItem';

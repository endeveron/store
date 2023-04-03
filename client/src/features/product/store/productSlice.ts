import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import {
  Cart,
  ICartProductItem,
  ProductDetails,
  ProductSlice,
} from 'features/product';

const initialState: ProductSlice = {
  details: null,
  cart: {
    items: [],
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductDetails: (state, action: PayloadAction<ProductDetails>) => {
      state.details = action.payload;
    },
    setCartProductItems: (state, action: PayloadAction<ICartProductItem[]>) => {
      state.cart.items = action.payload;
    },
    resetCart: (state) => {
      state.cart = initialState.cart;
    },

    resetProductState: (_) => initialState,
  },
});

const productReducer = productSlice.reducer;

export const {
  setCartProductItems,
  setProductDetails,
  resetCart,
  resetProductState,
} = productSlice.actions;

export const selectCart = (state: RootState): Cart => state.product.cart;

export const selectProductDetails = (state: RootState): ProductDetails | null =>
  state.product.details;

export { productReducer };

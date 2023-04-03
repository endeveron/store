import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { Shipping, User, UserAccount, UserSlice } from '../models/userModels';

const initialState: UserSlice = {
  account: null,
  shipping: null,
  _id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.account = action.payload.account;
      state._id = action.payload._id;
    },
    setUserAccount: (state, action: PayloadAction<UserAccount>) => {
      state.account = action.payload;
    },

    resetUserState: (_) => initialState,
  },
});

const userReducer = userSlice.reducer;

export const { setUser, setUserAccount, resetUserState } = userSlice.actions;

export const selectUserId = (state: RootState): string => state.user._id;
export const selectUserAccount = (state: RootState): UserAccount | null =>
  state.user.account;
export const selectShipping = (state: RootState): Shipping | null =>
  state.user.shipping;

export { userReducer };

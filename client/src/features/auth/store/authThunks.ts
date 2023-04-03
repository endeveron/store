import { Dispatch } from 'react';

import { persistor } from 'store';
import { resetAuthState } from './authSlice';
import { User, resetUserState, setUser } from 'features/user';
import { AuthResData, setAuthData } from 'features/auth';

interface StoreAuthDataAction {
  payload: string | User;
  type: string;
}

export const storeAuthData =
  ({ token, user }: AuthResData) =>
  (dispatch: Dispatch<StoreAuthDataAction>) => {
    dispatch(setAuthData(token));
    dispatch(setUser(user));
  };

export const clearStore =
  () =>
  async (
    dispatch: Dispatch<{
      payload: undefined;
      type: string;
    }>
  ) => {
    await persistor.purge();
    dispatch(resetAuthState());
    dispatch(resetUserState());
  };

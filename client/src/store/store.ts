import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { authReducer } from 'features/auth';
import { productReducer } from 'features/product';
import { userReducer } from 'features/user';
import { uiReducer } from 'store/ui';
import { api } from './api';
import { persistConfig } from './persistConfig';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  user: userReducer,
  product: productReducer,

  [api.reducerPath]: api.reducer,
});

const store = configureStore({
  // configureStore could automatically create the root reducer
  // by passing reducers object to the Redux combineReducers utility
  reducer: persistReducer(persistConfig, rootReducer),

  // configureStore will automatically pass those to applyMiddleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware),

  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store };

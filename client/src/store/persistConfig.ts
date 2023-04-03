import storage from 'redux-persist/lib/storage/session'; // use a SessionStorage
// import { productApi } from 'features/product/productApi';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // blacklist: [productApi.reducerPath], // will not be persisted
};

export { persistConfig };

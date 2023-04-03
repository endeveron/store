import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as ReactRoutes,
} from 'react-router-dom';

import { Layout } from 'components';
// import { RequireAuth } from './RequireAuth';
import {
  Cart,
  Checkout,
  Home,
  Login,
  ProductDetails,
  Search,
  Signup,
  Success,
} from 'views';
import { RequireAuth } from 'routes/RequireAuth';
// import { useAppSelector } from 'store';

const Routes = () => {
  // const token = useAppSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="cart" element={<Cart />} />
          <Route path="search" element={<Search />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route
            path="checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />

          <Route
            path="success"
            element={
              <RequireAuth>
                <Success />
              </RequireAuth>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  );
};

export { Routes };

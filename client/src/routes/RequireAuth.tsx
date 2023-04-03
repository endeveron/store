import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from 'store';
import { selectAuthToken } from 'features/auth';

interface RequireAuthProps {
  children: JSX.Element;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const token = useAppSelector(selectAuthToken);

  if (!token) {
    return <Navigate to="/login" replace={true} state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };

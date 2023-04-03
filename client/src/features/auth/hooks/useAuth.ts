import { useNavigate } from 'react-router-dom';

import { clearStore, AuthResData, storeAuthData } from 'features/auth';
import { useAppDispatch } from 'store';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const storeData = (data: AuthResData) => {
    const token = data?.token;
    const user = data?.user;
    token && user && dispatch(storeAuthData(data));
  };

  const signIn = (data: AuthResData, to: string) => {
    if (!data) return;
    storeData(data);
    navigate(to, { replace: true });
  };

  const signOut = () => {
    dispatch(clearStore());
    navigate('/', { replace: true });
  };

  return { signIn, signOut };
};

export { useAuth };

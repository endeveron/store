import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  AuthForm,
  AuthResData,
  AuthReqData,
  useAuth,
  useLoginMutation,
  selectAuthToken,
} from 'features/auth';
import { validateEmail, validatePassword } from 'common/utils/validate';
import { LocationState } from 'common/types';
import { FormField } from 'common/types/form';
import { useError } from 'common/hooks/useError';
import { ViewHeader } from 'components';
import { useAppSelector } from 'store';

import './Auth.scss';

const fields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    isRequired: true,
    autoFocus: true,
    validator: validateEmail,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    isRequired: true,
    validator: validatePassword,
  },
];

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { signIn } = useAuth();
  const { handleApiError } = useError();
  const [sendRequest, { isLoading }] = useLoginMutation();
  const token = useAppSelector(selectAuthToken);

  const state = location.state as LocationState;
  const to = state?.to?.pathname || '/';

  useEffect(() => {
    if (token) {
      navigate(to, { state: { from: '/cart' } });
    }
  }, [token, navigate, to]);

  const handleSubmit = async (authReqData: AuthReqData) => {
    try {
      const data: AuthResData = await sendRequest(authReqData).unwrap();
      signIn(data, to);
    } catch (err: any) {
      handleApiError(err);
    }
  };

  return (
    <div className="auth view">
      <ViewHeader title="Login" />

      <div className="auth__content view-content">
        <AuthForm
          fields={fields}
          isLoading={isLoading}
          submitBtnLabel="Login"
          onSubmitted={handleSubmit}
        />
        <div className="auth__link-wrapper">
          <Link to="/signup" state={state}>
            Don't have an account ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Login };

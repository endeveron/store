import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  AuthForm,
  AuthResData,
  AuthReqData,
  useAuth,
  useSignupMutation,
  selectAuthToken,
} from 'features/auth';
import {
  validateEmail,
  validateName,
  validatePassword,
} from 'common/utils/validate';
import { LocationState } from 'common/types';
import { FormField } from 'common/types/form';
import { useError } from 'common/hooks/useError';
import { ViewHeader } from 'components';
import { useAppSelector } from 'store';

import './Auth.scss';

const fields: FormField[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    validator: validateName,
    isRequired: true,
    autoFocus: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    validator: validateEmail,
    isRequired: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    validator: validatePassword,
    isRequired: true,
  },
];

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { signIn } = useAuth();
  const { handleApiError } = useError();
  const [sendRequest, { isLoading }] = useSignupMutation();
  const token = useAppSelector(selectAuthToken);

  const state = location.state as LocationState;
  const to = state?.to?.pathname || '/';

  useEffect(() => {
    if (token) {
      navigate(to);
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
      <ViewHeader title="Sign Up" />
      <div className="auth__content view-content">
        <AuthForm
          fields={fields}
          isLoading={isLoading}
          submitBtnLabel="Sign Up"
          onSubmitted={handleSubmit}
        />
        <div className="auth__link-wrapper">
          <Link to="/login" state={state}>
            Already registered ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Signup };

import { User } from 'features/user';

// auth form

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  name?: string;
  username?: string;
}

// api

export interface AuthReqData {
  name?: string;
  email: string;
  password: string;
}

// export interface SignupReqData extends LoginReqData {
//   name?: string;
//   username?: string;
// }

export interface AuthResData {
  token: string;
  user: User;
}

// redux

export interface AuthSlice {
  token: string;
}

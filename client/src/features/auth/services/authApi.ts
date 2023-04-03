import { api } from 'store/api';
import { AuthReqData, AuthResData } from '../models/authModels';
import { Response } from 'common/types/http';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResData, AuthReqData>({
      query: (data) => ({
        url: `auth/login`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (res: Response<AuthResData>) => res.data,
    }),
    signup: build.mutation<AuthResData, AuthReqData>({
      query: (data) => ({
        url: `auth/signup`,
        method: 'POST',
        body: data,
      }),
      transformResponse: (res: Response<AuthResData>) => res.data,
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

import { api } from 'store/api';
import { UpdateUserAccountReq, UserAccount } from '../models/userModels';

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateUserAccount: build.mutation<UserAccount, UpdateUserAccountReq>({
      query: ({ accountFormData, userId }) => ({
        url: `user/${userId}`,
        method: 'PATCH',
        body: accountFormData,
      }),
    }),
  }),
});

export const { useUpdateUserAccountMutation } = userApi;

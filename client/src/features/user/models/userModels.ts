// redux slice

export interface UserAccount {
  email: string;
  username: string;
  name?: string;
  avatarSrc?: string;
  avatarImg?: File;
}

export interface Shipping {
  city: string;
  address: string;
}

export interface User {
  _id: string;
  account: UserAccount;
}

export interface UserSlice {
  _id: string;
  account: UserAccount | null;
  shipping: Shipping | null;
}

// api

export interface UpdateUserAccountReq {
  accountFormData: FormData;
  userId: string;
}

import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

interface Description {
  status?: string | number;
  message?: string;
}

export interface Response<T> extends Description {
  data: T;
}

export interface ResponseError extends Description {
  data?: string;
}

export type ApiError = FetchBaseQueryError | SerializedError | undefined;

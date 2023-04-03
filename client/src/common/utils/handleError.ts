import { Dispatch } from 'react';

import { ToastContent } from 'components';
import { openToast } from 'store/ui';
import { ResponseError } from 'common/types/http';

export const handleHttpError =
  (error: ResponseError) =>
  (
    dispatch: Dispatch<{
      payload: ToastContent;
      type: string;
    }>
  ) => {
    dispatch(
      openToast({
        status: 'error',
        message:
          error?.message || error?.data || 'Error. Please try again later.',
      })
    );
  };

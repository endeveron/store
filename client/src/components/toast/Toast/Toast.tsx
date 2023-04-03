import { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';

import { useAppDispatch } from 'store';
import { closeToast } from 'store/ui';
import { ToastContent } from '../toastTypes';

import './Toast.scss';

interface ToastProps {
  content: ToastContent;
  isOpen: boolean;
}

const Toast = ({ content, isOpen }: ToastProps) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const timerRef: React.MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  > = useRef(undefined);

  useEffect(() => {
    isOpen && setOpen(true);
  }, [isOpen]);

  const clearReduxDataWithDelay = (delay: number) => {
    timerRef.current = setTimeout(() => {
      dispatch(closeToast());
    }, delay);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;

    setOpen(false);
    clearReduxDataWithDelay(1000);
  };

  // clear timer on component dismount
  useEffect(() => {
    return () => {
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, []);

  const StyledSnackbar = styled(Snackbar)<SnackbarProps>({
    top: '0.75rem',
  });

  return content && isOpen ? (
    <div className={`toast toast--${content.status}`} onClick={handleClose}>
      <StyledSnackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        onClose={handleClose}
        key="topcenter"
      >
        <div className="toast__content">{content.message}</div>
      </StyledSnackbar>
    </div>
  ) : null;
};

export { Toast };

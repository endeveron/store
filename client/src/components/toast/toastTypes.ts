import { AlertColor } from '@mui/material';

export interface ToastContent {
  message: string;
  status?: AlertColor;
}

import { ModalWindowContent, ToastContent } from 'components';

interface IsOpen {
  isOpen: boolean;
}

interface ModalWindow extends IsOpen {
  content: ModalWindowContent;
}

interface Toast extends IsOpen {
  content: ToastContent;
}

export type ThemeMode = 'light' | 'dark';

export interface UiState {
  themeMode: ThemeMode;
  actionModalWindow: ModalWindow;
  modalWindow: ModalWindow;
  toast: Toast;
  mainMenu: IsOpen;
}

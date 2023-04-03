import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store';
import { ThemeMode, UiState } from 'store/ui';
import { ModalWindowContent, ToastContent } from 'components';

const mainMenuInitialState = {
  isOpen: false,
};

const modalWindowInitialState = {
  content: {
    title: '',
    message: '',
  },
  isOpen: false,
};

const toastInitialState = {
  content: {
    message: '',
  },
  isOpen: false,
};

const initialState: UiState = {
  themeMode: 'light',
  actionModalWindow: modalWindowInitialState,
  modalWindow: modalWindowInitialState,
  toast: toastInitialState,
  mainMenu: mainMenuInitialState,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },

    openModalWindow: (state, action: PayloadAction<ModalWindowContent>) => {
      state.modalWindow.content = action.payload;
      state.modalWindow.isOpen = true;
    },
    closeModalWindow: (state) => {
      state.modalWindow = modalWindowInitialState;
    },

    openActionModalWindow: (
      state,
      action: PayloadAction<ModalWindowContent>
    ) => {
      state.actionModalWindow.content = action.payload;
      state.actionModalWindow.isOpen = true;
    },
    closeActionModalWindow: (state) => {
      state.actionModalWindow = modalWindowInitialState;
    },

    openToast: (state, action: PayloadAction<ToastContent>) => {
      state.toast.content = action.payload;
      state.toast.isOpen = true;
    },
    closeToast: (state) => {
      state.toast = toastInitialState;
    },

    openMainMenu: (state) => {
      state.mainMenu.isOpen = true;
    },
    closeMainMenu: (state) => {
      state.mainMenu.isOpen = false;
    },

    clearUiState: () => initialState,
  },
});

const uiReducer = uiSlice.reducer;

export const {
  setThemeMode,
  openActionModalWindow,
  closeActionModalWindow,
  openModalWindow,
  closeModalWindow,
  openToast,
  closeToast,
  openMainMenu,
  closeMainMenu,
} = uiSlice.actions;

export const selectThemeMode = (state: RootState) => state.ui.themeMode;
export const selectActionModalWindowContent = (state: RootState) =>
  state.ui.actionModalWindow.content;
export const selectActionModalWindowIsOpen = (state: RootState) =>
  state.ui.actionModalWindow.isOpen;
export const selectModalWindowContent = (state: RootState) =>
  state.ui.modalWindow.content;
export const selectModalWindowIsOpen = (state: RootState) =>
  state.ui.modalWindow.isOpen;
export const selectToastContent = (state: RootState) => state.ui.toast.content;
export const selectToastIsOpen = (state: RootState) => state.ui.toast.isOpen;
export const selectMainMenuIsOpen = (state: RootState) =>
  state.ui.mainMenu.isOpen;

export { uiReducer };

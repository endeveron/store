// import { usePingServer } from 'common/hooks/usePingServer';
import { useModalWindow, useToast } from 'components';
import { MuiThemeProvider } from 'features/muiTheme';
import { Routes } from 'routes/Routes';

import './App.scss';

const App = () => {
  const { ModalWindow } = useModalWindow();
  const { Toast } = useToast();

  // usePingServer();

  return (
    <MuiThemeProvider>
      <ModalWindow />
      <Toast />
      <Routes />
    </MuiThemeProvider>
  );
};

export { App };

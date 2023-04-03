import { Outlet } from 'react-router-dom';

import { MainMenu, Navbar } from 'components';

import './Layout.scss';

const Layout = () => {
  return (
    <div className="layout">
      <MainMenu />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export { Layout };

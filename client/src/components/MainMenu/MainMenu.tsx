import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { v4 as uuid } from 'uuid';

import {
  CategoryIcon,
  CloseIcon,
  LoginIcon,
  LogoutIcon,
  SupportIcon,
} from 'assets/ui';
import { selectUserAccount } from 'features/user';
import { useAuth } from 'features/auth';
import { useAppDispatch, useAppSelector } from 'store';
import { closeMainMenu, selectMainMenuIsOpen } from 'store/ui';

import './MainMenu.scss';

interface IMenuItem {
  icon: ReactElement;
  title: string;
  navigateTo: string;
}

const menuItems: IMenuItem[] = [
  {
    icon: <CategoryIcon />,
    title: 'Categories',
    navigateTo: '/',
  },
  {
    icon: <SupportIcon />,
    title: 'Contact Support',
    navigateTo: '/',
  },
];

const MainMenu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isOpen = useAppSelector(selectMainMenuIsOpen);
  const userAccount = useAppSelector(selectUserAccount);

  const { signOut } = useAuth();

  const isUserAuth = userAccount?.email;

  const handleCloseMenu = () => {
    dispatch(closeMainMenu());
  };

  const handleAuth = () => {
    if (isUserAuth) {
      signOut();
    } else {
      handleCloseMenu();
      navigate('login');
    }
  };

  const handleCloseDriver = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    handleCloseMenu();
  };

  const handleListItemClick = (navigateTo: string) => {
    navigate(navigateTo);
    handleCloseMenu();
  };

  return (
    <div className="main-menu">
      <Drawer
        className="main-menu__drawer"
        anchor="left"
        open={isOpen}
        onClose={handleCloseDriver}
      >
        <div className="main-menu__sidebar">
          <div className="main-menu__header">
            <div className="main-menu__navbar">
              <CloseIcon
                onClick={handleCloseMenu}
                className="main-menu__close icon icon--inverse icon--action"
              />
              <div onClick={handleAuth} className="main-menu__auth">
                <div className="main-menu__auth-title">
                  {isUserAuth ? 'Sign Out' : 'Sign In'}
                </div>
                <div className="main-menu__auth-icon">
                  {isUserAuth ? (
                    <LogoutIcon className="icon icon--inverse" />
                  ) : (
                    <LoginIcon className="icon icon--inverse" />
                  )}
                </div>
              </div>
            </div>

            <div className="main-menu__header-content">
              {isUserAuth && (
                <div className="main-menu__user-info">
                  <div className="main-menu__user-name">{userAccount.name}</div>
                  <div className="main-menu__user-email secondary-text">
                    {userAccount.email}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="main-menu__content">
            <nav aria-label="main mailbox folders">
              <List>
                {menuItems?.map((item) => (
                  <ListItem disablePadding key={uuid()}>
                    <ListItemButton
                      onClick={() => handleListItemClick(item.navigateTo)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </nav>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export { MainMenu };

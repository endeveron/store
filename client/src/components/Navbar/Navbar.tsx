import { ReactElement, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'store';
import { openMainMenu } from 'store/ui';
import { MenuIcon, SearchIcon, ShoppingCartIcon } from 'assets/ui';
import { Logo } from 'components/Logo/Logo';

import './Navbar.scss';

const navbarItems = [
  {
    name: 'menu',
    icon: <MenuIcon />,
  },
  {
    name: 'main',
    navigatePath: '/',
  },
  {
    name: 'search',
    icon: <SearchIcon />,
    navigatePath: '/search',
  },
  {
    name: 'cart',
    icon: <ShoppingCartIcon />,
    navigatePath: '/cart',
  },
];

interface NavbarItem {
  name: string;
}

interface NavbarMenuItem extends NavbarItem {
  icon: ReactElement;
}

interface NavbarNavigate extends NavbarItem {
  navigatePath: string;
}

interface NavbarActionItem extends NavbarItem, NavbarNavigate {
  icon: string;
}

const Navbar = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { items } = useAppSelector((state) => state.product.cart);

  const hideActionPathes = [
    '/checkout',
    '/login',
    '/signup',
    '/cart',
    '/search',
  ];
  const hideActions = hideActionPathes.includes(location.pathname);

  const handleOpenMenu = () => {
    dispatch(openMainMenu());
  };

  useEffect(() => {}, []);

  const renderMenuItem = (item: NavbarMenuItem) => (
    <div
      onClick={handleOpenMenu}
      className={`navbar__icon navbar__icon--${item.name} icon icon--action icon--inverse`}
      key={item.name}
    >
      {item.icon}
    </div>
  );

  const renderActionItem = (item: NavbarActionItem) => {
    if (hideActions) return null;

    return (
      <Link
        to={item.navigatePath || '/'}
        className={classNames(
          `navbar__icon navbar__icon--${item.name} icon icon--action icon--inverse`,
          {
            'navbar__icon--cart-marker':
              item.name === 'cart' && !!items?.length,
          }
        )}
        key={item.name}
      >
        {item.icon}
      </Link>
    );
  };

  const logoClassName = `navbar__logo-wrapper translate-${
    hideActions ? 'left' : 'right'
  }`;

  const renderMainItem = (item: NavbarNavigate) => (
    <div className="navbar__main" key={item.name}>
      <Link className={logoClassName} to={item.navigatePath || '/'}>
        <Logo />
      </Link>
    </div>
  );

  const renderNavbarItem = (
    item: NavbarMenuItem | NavbarNavigate | NavbarActionItem
  ) => {
    if (item.name === 'menu') return renderMenuItem(item as NavbarMenuItem);
    if (item.name === 'main') return renderMainItem(item as NavbarNavigate);
    return renderActionItem(item as NavbarActionItem);
  };

  return (
    <nav className="navbar">
      {navbarItems.map((item) => renderNavbarItem(item))}
    </nav>
  );
};

export { Navbar };

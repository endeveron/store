import { Logo as LogoIcon } from 'assets/ui';

import './Logo.scss';

const Logo = () => {
  return (
    <div className="logo">
      <LogoIcon />
      <div className="logo_title">Store</div>
    </div>
  );
};

export { Logo };

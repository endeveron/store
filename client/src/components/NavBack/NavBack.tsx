import { useNavigate } from 'react-router-dom';

import { ArrowBackIcon } from 'assets/ui';

import './NavBack.scss';

type NavBackProps = {
  to?: string;
};

const NavBack = ({ to }: NavBackProps) => {
  const navigate = useNavigate();

  const clickHandler = (): void => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <ArrowBackIcon
      className="nav-back icon icon--action icon--inverse"
      onClick={clickHandler}
    />
  );
};

export { NavBack };

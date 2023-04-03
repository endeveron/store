import { ReactElement } from 'react';

import { NavBack } from 'components';

import './ViewHeader.scss';

type ViewHeaderProps = {
  children?: ReactElement<any, any>;
  title?: string;
  navbackPath?: string;
};

const ViewHeader = ({ title, navbackPath, children }: ViewHeaderProps) => {
  return (
    <div className="view-header">
      <NavBack to={navbackPath} />
      {title ? <h2 className="view-header__title">{title}</h2> : children}
    </div>
  );
};

export { ViewHeader };

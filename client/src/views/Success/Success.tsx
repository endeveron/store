import { Button, ViewHeader } from 'components';
import { useLocation, useNavigate } from 'react-router-dom';

import './Success.scss';

const Success = () => {
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const handleGoMainButton = () => {
    navigate('/');
  };

  const orderNumber = locationState?.orderNumber;
  const orderNumberEl = orderNumber && (
    <span className="success__order-number">#{locationState.orderNumber}</span>
  );

  return (
    <div className="success">
      <ViewHeader title="Success" />

      <div className="success__content view-content">
        <h2 className="success__title">Order {orderNumberEl} is placed</h2>
        <p className="success__message">Thank you. We will contact you soon.</p>
        <div className="success__actions">
          <Button
            onClick={handleGoMainButton}
            color="primary"
            className="success__button"
            variant="contained"
          >
            To Main
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Success };

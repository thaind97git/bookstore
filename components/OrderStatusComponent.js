import React from 'react';
import { Button } from '@material-ui/core';

const getButtonStyleByStatus = (status) => {
  switch (status) {
    case 1:
      return (
        <Button size="small" variant="contained" color="secondary">
          Waiting
        </Button>
      );
    case 2:
      return (
        <Button size="small" variant="contained" color="primary">
          Processed
        </Button>
      );
    case 3:
      return (
        <Button
          size="small"
          variant="contained"
          style={{ background: '#4caf50', color: 'white' }}
        >
          Completed
        </Button>
      );

    default:
      break;
  }
};

const OrderStatusComponent = ({ status }) => getButtonStyleByStatus(status);
export default OrderStatusComponent;

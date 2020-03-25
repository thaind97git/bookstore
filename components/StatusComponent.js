import React from 'react';
import { Chip } from '@material-ui/core';

const StatusComponent = ({ status = 1 }) => {
  return (
    <Chip
      size="small"
      label={status ? 'Active' : 'Deactive'}
      style={{ background: status ? 'green' : 'red', color: 'white' }}
    />
  );
};
export default StatusComponent;

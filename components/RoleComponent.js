import React from 'react';
import { Chip } from '@material-ui/core';
import { GUEST, MODERATOR, ADMIN } from '../enums/userType';

const getLabelByType = type => {
  switch (type) {
    case GUEST:
      return 'Guest';
    case MODERATOR:
      return 'Moderator';
    case ADMIN:
      return 'Admin';
    default:
      return 'Guest';
  }
};

const getBackgroundByType = type => {
  switch (type) {
    case GUEST:
      return 'default';
    case MODERATOR:
      return 'secondary';
    case ADMIN:
      return 'primary';
    default:
      return 'secondary';
  }
};

const RoleComponent = ({ type = GUEST }) => {
  return (
    <Chip label={getLabelByType(type)} color={getBackgroundByType(type)} />
  );
};
export default RoleComponent;

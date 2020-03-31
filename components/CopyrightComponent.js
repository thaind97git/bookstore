import React from 'react';
import { Typography, Link } from '@material-ui/core';

function CopyrightComponent({ children, link }) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={link}>
        {children}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} All Rights Reserved.
    </Typography>
  );
}
export default CopyrightComponent;

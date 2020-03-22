import React, { Fragment } from 'react';
import { Card, makeStyles, Divider } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: '0 2px 6px rgba(28,35,43,0.06)'
  },
  card: {
    padding: theme.spacing(3)
  }
}));
const CardSimpleLayout = ({ header, body, footer, cardSympleStyles }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} style={cardSympleStyles}>
      {header && (
        <Fragment>
          <div className={classes.card}>{header}</div>
          <Divider />
        </Fragment>
      )}
      <div className={classes.card}>{body}</div>
      {footer && (
        <Fragment>
          <Divider />
          <div className={classes.card}>{footer}</div>
        </Fragment>
      )}
    </Card>
  );
};

export default CardSimpleLayout;

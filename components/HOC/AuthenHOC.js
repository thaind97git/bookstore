import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { isServer } from '../../utils';
import React from 'react';

import {
  GetCurrentUserAPI,
  getCurrentUser,
  verifyLogin
} from '../../stores/UserState';
import { Backdrop, withStyles, CircularProgress } from '@material-ui/core';
import { compose } from 'recompose';

const connectWithRedux = connect(
  createStructuredSelector({
    currentUser: GetCurrentUserAPI.dataSelector
  })
);

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
});

const enhance = compose(connectWithRedux, withStyles(styles));

export default function withAuth(AuthComponent) {
  class AuthenHOC extends React.Component {
    static getInitialProps = async (ctx) => {
      return AuthComponent.getInitialProps
        ? AuthComponent.getInitialProps(ctx)
        : {};
    };

    componentDidMount() {
      if (!isServer) {
        this.props.dispatch(getCurrentUser());
      }
    }

    render() {
      const { currentUser, classes } = this.props;
      return (
        <div>
          {!verifyLogin(currentUser) ? (
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <AuthComponent {...this.props} isLoggedIn={true} />
          )}
        </div>
      );
    }
  }

  return enhance(AuthenHOC);
}

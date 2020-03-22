import { makeFetchAction } from 'redux-api-call';
import Router from 'next/router';

import { respondToSuccess, respondToFailure } from './middlewares/api-reaction';
import { createErrorSelector } from '../utils';
import { saveToken, removeToken } from '../libs/token-libs';
import nfetch from '../libs/nfetch';

export const LOGIN_ADMIN = 'LOGIN_ADMIN';
const GET_CURRENT_USER = 'GET_CURRENT_USER';

export const loginAdminAPI = makeFetchAction(
  LOGIN_ADMIN,
  ({ username, password }) =>
    nfetch({
      endpoint: `/auth/login`
    })({ username, password })
);

export const loginAdmin = ({ username, password }) => {
  return respondToSuccess(
    loginAdminAPI.actionCreator({
      username,
      password
    }),
    resp => {
      saveToken(resp);
      Router.push('/admin');
      return;
    }
  );
};

export const loginUserErrorMessageSelector = createErrorSelector(loginAdminAPI);

export const getCurrentUserAPI = makeFetchAction(
  GET_CURRENT_USER,
  nfetch({
    endpoint: `/api/v2/users/my_profile`,
    method: 'GET'
  })
);

export const verifyLogin = user => {
  if (!user) {
    return false;
  }
  return true;
};

export const getCurrentUser = () => {
  return respondToFailure(getCurrentUserAPI.actionCreator(), resp => {
    if (resp.errors) {
      console.error('Err: ', resp.errors);
      return;
    }

    if (!verifyLogin(resp.user_id)) {
      return Router.replace({
        pathname: '/login'
      });
    }

    return;
  });
};

export const logOut = () => {
  removeToken();
  Router.push('/admin/login');
};

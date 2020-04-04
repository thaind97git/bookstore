import { makeFetchAction } from 'redux-api-call';
import Router from 'next/router';

import { respondToSuccess, respondToFailure } from './middlewares/api-reaction';
import { createErrorSelector } from '../utils';
import { saveToken, removeToken } from '../libs/token-libs';
import nfetch from '../libs/nfetch';
import { getAllModerator } from './ModeratorState';
import { ADMIN, MODERATOR } from '../enums/userType';

export const LOGIN_ADMIN = 'LOGIN_ADMIN';
const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_ALL_USER = 'GET_ALL_USER';

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
    (resp) => {
      saveToken(resp);
      Router.push('/admin');
      return;
    }
  );
};

export const loginUserErrorMessageSelector = createErrorSelector(loginAdminAPI);

export const GetCurrentUserAPI = makeFetchAction(
  GET_CURRENT_USER,
  nfetch({
    endpoint: `/auth/me`,
    method: 'GET'
  })
);

export const verifyLogin = (user = {}) => {
  if (!(user && [ADMIN, MODERATOR].includes(user.role))) {
    return false;
  }
  return true;
};

export const getCurrentUser = () => {
  return respondToFailure(GetCurrentUserAPI.actionCreator(), (resp) => {
    if (resp.errors) {
      console.error('Err: ', resp.errors);
      return;
    }

    if (!verifyLogin(resp)) {
      return Router.replace({
        pathname: '/admin/login'
      });
    }

    return;
  });
};

export const logOut = () => {
  removeToken();
  Router.push('/admin/login');
};

export const DeleteUserAPI = makeFetchAction(DELETE_USER, (id) =>
  nfetch({
    endpoint: `/user/${id}`,
    method: 'DELETE'
  })()
);
export const deleteUser = (id) =>
  respondToSuccess(DeleteUserAPI.actionCreator(id), (resp, header, store) => {
    store.dispatch(
      getAllModerator({
        pageSize: 5,
        pageIndex: 1
      })
    );
  });

export const GetAllUserAPI = makeFetchAction(
  GET_ALL_USER,
  ({ pageSize, pageIndex }) =>
    nfetch({
      method: 'GET',
      endpoint: `/user/guest?pageNumber=${pageIndex}&pageSize=${pageSize}&sortDirection=asc&sortField=id`
    })()
);

export const getAllUser = ({ pageSize, pageIndex }) =>
  respondToSuccess(GetAllUserAPI.actionCreator({ pageSize, pageIndex }));

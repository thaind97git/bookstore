import { makeFetchAction } from 'redux-api-call';
import nfetch from '../libs/nfetch';
import { respondToSuccess } from './middlewares/api-reaction';
import Router from 'next/router';

export const GET_ALL_MODERATOR = 'GET_ALL_USGET_ALL_MODERATORER';
export const SAVE_MODERATOR = 'SAVE_MODERATOR';

export const GetAllModeratorAPI = makeFetchAction(
  GET_ALL_MODERATOR,
  ({ pageSize, pageIndex }) =>
    nfetch({
      method: 'GET',
      endpoint: `/user/moderator?pageNumber=${pageIndex}&pageSize=${pageSize}&sortDirection=asc&sortField=id`
    })()
);

export const getAllModerator = ({ pageSize, pageIndex }) =>
  respondToSuccess(
    GetAllModeratorAPI.actionCreator({ pageIndex, pageSize }),
    () => {
      return;
    }
  );

export const SaveModeratorAPI = makeFetchAction(SAVE_MODERATOR, (objectBody) =>
  nfetch({
    endpoint: '/user'
  })(objectBody)
);
export const saveModerator = (objectValues) =>
  respondToSuccess(SaveModeratorAPI.actionCreator(objectValues), () => {
    Router.push('/admin/moderator');
  });

import { makeFetchAction } from 'redux-api-call';
import nfetch from '../libs/nfetch';
import { respondToSuccess } from './middlewares/api-reaction';

export const GET_ALL_USER = 'GET_ALL_USER';

export const GetAllUSerAPI = makeFetchAction(
  GET_ALL_USER,
  ({ pageSize, pageIndex }) =>
    nfetch({
      method: 'GET',
      endpoint: `/user?pageNumber=${pageIndex}&pageSize=${pageSize}&sortDirection=asc&sortField=id`
    })()
);

export const getAllUSer = ({ pageSize, pageIndex }) =>
  respondToSuccess(
    GetAllUSerAPI.actionCreator({ pageIndex, pageSize }, () => {
      return;
    })
  );

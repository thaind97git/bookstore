import { makeFetchAction } from 'redux-api-call';
import nfetch from '../libs/nfetch';
import { respondToSuccess } from './middlewares/api-reaction';
import { removeCard } from '../libs/card-libs';
import Router from 'next/router';

export const GET_ORDERS = 'GET_ORDERS';
export const SAVE_ORDERS = 'SAVE_ORDERS';
export const SEARCH_ORDER_BY_CODE = 'SEARCH_ORDER_BY_CODE';

export const GetOrdersAPI = makeFetchAction(
  GET_ORDERS,
  ({ pageSize, pageIndex }) =>
    nfetch({
      method: 'GET',
      endpoint: `/order?pageNumber=${pageIndex}&pageSize=${pageSize}&sortDirection=asc`
    })()
);
export const getOrders = ({ pageSize, pageIndex }) =>
  respondToSuccess(GetOrdersAPI.actionCreator({ pageIndex, pageSize }));

export const SaveOrderAPI = makeFetchAction(SAVE_ORDERS, objectBody =>
  nfetch({
    endpoint: '/order'
  })(objectBody)
);
export const saveOrder = objectValues =>
  respondToSuccess(SaveOrderAPI.actionCreator(objectValues), () => {
    Router.push('/');
    removeCard();
  });

export const SearchOrderByCodeAPI = makeFetchAction(
  SEARCH_ORDER_BY_CODE,
  ({ code, customerEmail }) =>
    nfetch({
      method: 'GET',
      endpoint: `/order/${code}?customerEmail=${customerEmail}`
    })()
);
export const searchOrderByCode = ({ code, customerEmail }) =>
  respondToSuccess(SearchOrderByCodeAPI.actionCreator({ code, customerEmail }));

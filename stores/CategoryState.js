import { makeFetchAction } from 'redux-api-call';
import nfetch from '../libs/nfetch';
import { respondToSuccess } from './middlewares/api-reaction';
import Router from 'next/router';

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const SAVE_CATEGORY = 'SAVE_CATEGORY';
export const GET_CATEGORY_DETAILS = 'GET_CATEGORY_DETAILS';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const SEARCH_CATEGORY = 'SEARCH_CATEGORY';

export const GetAllCategoriesAPI = makeFetchAction(GET_CATEGORIES, () =>
  nfetch({
    method: 'GET',
    endpoint: `/category`
  })()
);
export const getAllCategories = () =>
  respondToSuccess(GetAllCategoriesAPI.actionCreator());

export const GetCategoriesAPI = makeFetchAction(
  GET_CATEGORIES,
  ({ pageSize, pageIndex }) =>
    nfetch({
      method: 'GET',
      endpoint: `/category?pageNumber=${pageIndex}&pageSize=${pageSize}&sortDirection=asc&sortField=id`
    })()
);
export const getCategories = ({ pageSize, pageIndex }) =>
  respondToSuccess(GetCategoriesAPI.actionCreator({ pageIndex, pageSize }));

export const SaveCategoryAPI = makeFetchAction(SAVE_CATEGORY, (objectBody) =>
  nfetch({
    endpoint: '/category'
  })(objectBody)
);
export const saveCategory = (objectValues) =>
  respondToSuccess(SaveCategoryAPI.actionCreator(objectValues), () => {
    Router.push('/admin/category');
  });

export const DeleteCategoryAPI = makeFetchAction(DELETE_CATEGORY, (id) =>
  nfetch({
    method: 'DELETE',
    endpoint: `/category/${id}`
  })()
);
export const deleteCategory = (id) =>
  respondToSuccess(
    DeleteCategoryAPI.actionCreator(id),
    (resp, header, store) => {
      store.dispatch(getCategories({ pageSize: 5, pageIndex: 1 }));
    }
  );

export const SearchCategoryAPI = makeFetchAction(
  SEARCH_CATEGORY,
  (searchParam) =>
    nfetch({
      method: 'GET',
      endpoint: `/category/search?name=${searchParam}`
    })
);
export const searchCategory = (searchParam) =>
  respondToSuccess(SearchCategoryAPI.actionCreator(searchParam));

export const GetCategoryDetailsAPI = makeFetchAction(
  GET_CATEGORY_DETAILS,
  (id) =>
    nfetch({
      method: 'GET',
      endpoint: `/category/${id}`
    })()
);
export const getCategoryDetails = (id) =>
  respondToSuccess(GetCategoryDetailsAPI.actionCreator(id));

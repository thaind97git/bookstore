import { makeFetchAction } from 'redux-api-call';
import nfetch from '../libs/nfetch';
import { respondToSuccess } from './middlewares/api-reaction';

export const GET_BOOKS = 'GET_BOOKS';
export const SAVE_BOOK = 'SAVE_BOOK';
export const DELETE_BOOK = 'DELETEBOOK';
export const SEARCH_BOOK = 'SEARCH_BOOK';
export const GET_BOOK_DETAILS = 'GET_BOOK_DETAILS';

export const GetBooksAPI = makeFetchAction(
  GET_BOOKS,
  ({ pageSize, pageIndex }) =>
    nfetch({
      method: 'GET',
      endpoint: `/book?pageNumber=${pageIndex}&pageSize=${pageSize}&sortDirection=asc&sortField=isbn`
    })()
);
export const getBooks = ({ pageSize, pageIndex }) =>
  respondToSuccess(GetBooksAPI.actionCreator({ pageIndex, pageSize }));

export const SaveBookAPI = makeFetchAction(SAVE_BOOK, formData =>
  nfetch({
    endpoint: '/book'
  })(formData)
);
export const saveBook = formData =>
  respondToSuccess(SaveBookAPI.actionCreator(formData));

export const DeleteBookAPI = makeFetchAction(DELETE_BOOK, id =>
  nfetch({
    method: 'DELETE',
    endpoint: `/book/${id}/delete`
  })
);
export const deleteBook = id =>
  respondToSuccess(DeleteBookAPI.actionCreator(id));

export const SearchBookAPI = makeFetchAction(SEARCH_BOOK, searchParam =>
  nfetch({
    method: 'GET',
    endpoint: `/book/search?query=${searchParam}`
  })
);
export const searchBook = searchParam =>
  respondToSuccess(SearchBookAPI.actionCreator(searchParam));

export const GetBookDetailsAPI = makeFetchAction(GET_BOOK_DETAILS, id =>
  nfetch({
    method: 'GET',
    endpoint: `/book/${id}`
  })()
);
export const getBookDetails = id =>
  respondToSuccess(GetBookDetailsAPI.actionCreator(id));

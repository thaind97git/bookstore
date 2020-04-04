import React, { useState, useEffect, Fragment } from 'react';
import TablePaginationComponent from '../components/commons/TablePaginationComponent';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import { Button, Grid, Tooltip, IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DialogComponent from './commons/DialogComponent';
import {
  GetBooksAPI,
  getBooks,
  DeleteBookAPI,
  deleteBook
} from '../stores/BookState';
import RLink from '../layouts/RLink';
import { formatDisplayNumber, getShortString } from '../utils';
import { GetAllCategoriesAPI, getAllCategories } from '../stores/CategoryState';
import { Edit } from '@material-ui/icons';

const ISBN_DOMAIN = process.env.ISBN_DOMAIN || 'https://isbnsearch.org/isbn';

const connectToRedux = connect(
  createStructuredSelector({
    bookData: GetBooksAPI.dataSelector,
    allCategoryData: GetAllCategoriesAPI.dataSelector,
    deleteBookData: DeleteBookAPI.dataSelector
  }),
  (dispatch) => ({
    getBooks: ({ pageSize, pageIndex }) =>
      dispatch(getBooks({ pageIndex, pageSize })),
    getAllCategories: () => dispatch(getAllCategories()),
    deleteBook: (isbn) => dispatch(deleteBook(isbn))
  })
);

const HEADERS = [
  {
    header: 'ISBN',
    key: 'isbn'
  },
  {
    header: 'Title',
    key: 'title'
  },
  {
    header: 'Price',
    key: 'price'
  },
  {
    header: 'Author',
    key: 'author'
  },
  {
    header: 'Publisher',
    key: 'publisher'
  },
  {
    header: 'Category',
    key: 'category'
  },
  {
    header: 'Actions',
    key: 'actions'
  }
];
const renderData = ({
  data = [],
  setDialogDelete,
  setIdDeleted,
  categories = []
}) =>
  data.map((item) => {
    const currentCategory =
      categories.find((cate) => cate.id === item.categoryId) || {};
    return {
      isbn: (
        <a
          href={`${ISBN_DOMAIN}/${item.isbn}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.isbn}
        </a>
      ),
      title: (
        <Tooltip title={item.title}>
          <div>{getShortString(item.title)}</div>
        </Tooltip>
      ),
      price: `$ ${formatDisplayNumber(item.price)}`,
      author: (
        <Tooltip title={item.author}>
          <span>{item.author}</span>
        </Tooltip>
      ),
      publisher: item.publisher,
      category: currentCategory.name || item.categoryId,
      actions: (
        <Fragment>
          <RLink href={`/admin/book/edit?isbn=${item.isbn}`}>
            <Tooltip title="Edit">
              <IconButton>
                <Edit />
              </IconButton>
            </Tooltip>
          </RLink>{' '}
          <Button
            size="small"
            variant="contained"
            color="secondary"
            disableElevation
            onClick={() => {
              setDialogDelete(true);
              setIdDeleted(item.isbn);
            }}
          >
            Delete
          </Button>
        </Fragment>
      )
    };
  });

export const BookManagementComponent = ({
  getBooks,
  bookData,
  deleteBook,
  getAllCategories,
  allCategoryData
}) => {
  const [isFetch, setIsFetch] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [idDeleted, setIdDeleted] = useState(null);

  useEffect(() => {
    if (isFetch) {
      getBooks({ pageIndex, pageSize });
      getAllCategories();
      setIsFetch(false);
    }
  }, [isFetch, getBooks, pageSize, pageIndex, getAllCategories]);

  useEffect(() => {
    setIsFetch(true);
  }, [pageIndex, pageSize]);

  if (!bookData) {
    return <Grid />;
  }

  const { content = [], totalElements } = bookData;
  return (
    <Fragment>
      <DialogComponent
        size="xs"
        isOpenDialog={dialogDelete}
        setIsOpenDialog={setDialogDelete}
        title="Delete record"
        onCancel={() => {
          setDialogDelete(false);
        }}
        onOk={() => {
          deleteBook(idDeleted);
          setDialogDelete(false);
        }}
      />
      <CardSimpleLayout
        header={
          <Grid container justify="space-between">
            <span>Book Management</span>
            <RLink href="/admin/book/add-new">
              <Button
                size="small"
                variant="contained"
                color="primary"
                disableElevation
              >
                Add New Book
              </Button>
            </RLink>
          </Grid>
        }
        body={
          <TablePaginationComponent
            totalCount={totalElements}
            headers={HEADERS}
            onChangePageSize={(pageIndex, pageSize) => {
              setPageSize(pageSize);
              setPageIndex(pageIndex);
            }}
            rows={renderData({
              data: content,
              setIdDeleted,
              setDialogDelete,
              categories: allCategoryData || []
            })}
            striped
          />
        }
      />
    </Fragment>
  );
};
export default connectToRedux(BookManagementComponent);

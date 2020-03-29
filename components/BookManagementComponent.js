import React, { useState, useEffect, Fragment } from 'react';
import TablePaginationComponent from '../components/commons/TablePaginationComponent';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import RoleComponent from './RoleComponent';
import StatusComponent from './StatusComponent';
import { Button, Grid } from '@material-ui/core';
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

const connectToRedux = connect(
  createStructuredSelector({
    bookData: GetBooksAPI.dataSelector,
    deleteBookData: DeleteBookAPI.dataSelector
  }),
  dispatch => ({
    getBooks: ({ pageSize, pageIndex }) =>
      dispatch(getBooks({ pageIndex, pageSize })),
    deleteBook: id => dispatch(deleteBook(id))
  })
);

const HEADERS = [
  {
    header: 'Name',
    key: 'name'
  },
  {
    header: 'Image',
    key: 'image'
  },
  {
    header: 'Categories',
    key: 'categories'
  },
  {
    header: 'Status',
    key: 'status'
  },
  {
    header: 'Actions',
    key: 'actions'
  }
];
const renderData = ({ data = [], setDialogDelete, setIdDeleted }) =>
  data.map(item => ({
    fullName: item.fullName,
    username: item.username,
    role: <RoleComponent type={item.role} />,
    status: <StatusComponent status={item.status} />,
    actions: (
      <Button
        size="small"
        variant="contained"
        color="secondary"
        disableElevation
        onClick={() => {
          setDialogDelete(true);
          setIdDeleted(item.id);
        }}
      >
        Delete
      </Button>
    )
  }));

export const BookManagementComponent = ({
  getBooks,
  bookData,
  deleteBook,
  deleteBookData
}) => {
  const [isFetch, setIsFetch] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [idDeleted, setIdDeleted] = useState(null);
  const [isDelete, setIsDelete] = useState(true);

  useEffect(() => {
    if (isFetch) {
      getBooks({ pageIndex, pageSize });
      setIsFetch(false);
    }
  }, [isFetch, getBooks, pageSize, pageIndex]);

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
          deleteBookData && setIsFetch(true);
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
              setDialogDelete
            })}
            striped
          />
        }
      />
    </Fragment>
  );
};
export default connectToRedux(BookManagementComponent);

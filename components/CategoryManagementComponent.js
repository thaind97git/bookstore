import React, { useState, useEffect, Fragment } from 'react';
import TablePaginationComponent from '../components/commons/TablePaginationComponent';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import StatusComponent from './StatusComponent';
import { Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import DialogComponent from './commons/DialogComponent';
import {
  GetCategoriesAPI,
  getCategories,
  DeleteCategoryAPI,
  deleteCategory
} from '../stores/CategoryState';
import RLink from '../layouts/RLink';

const connectToRedux = connect(
  createStructuredSelector({
    categoryData: GetCategoriesAPI.dataSelector,
    deleteCategoryData: DeleteCategoryAPI.dataSelector
  }),
  (dispatch) => ({
    getCategories: ({ pageSize, pageIndex }) =>
      dispatch(getCategories({ pageIndex, pageSize })),
    deleteCategory: (id) => dispatch(deleteCategory(id))
  })
);

const HEADERS = [
  {
    header: 'Name',
    key: 'name'
  },
  {
    header: 'Description',
    key: 'description'
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
  data.map((item) => ({
    name: item.name,
    description: item.description,
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
  getCategories,
  categoryData,
  deleteCategory,
  deleteCategoryData
}) => {
  const [isFetch, setIsFetch] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [idDeleted, setIdDeleted] = useState(null);

  useEffect(() => {
    if (isFetch) {
      getCategories({ pageIndex, pageSize });
      setIsFetch(false);
    }
  }, [isFetch, getCategories, pageSize, pageIndex]);

  useEffect(() => {
    setIsFetch(true);
  }, [pageIndex, pageSize]);

  if (!categoryData) {
    return <Grid />;
  }

  const { content = [], totalElements } = categoryData;
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
          deleteCategory(idDeleted);
          deleteCategoryData && setIsFetch(true);
          setDialogDelete(false);
        }}
      />
      <CardSimpleLayout
        header={
          <Grid container justify="space-between">
            <span>Category Management</span>
            <RLink href="/admin/category/add-new">
              <Button
                size="small"
                variant="contained"
                color="primary"
                disableElevation
              >
                Add New Category
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

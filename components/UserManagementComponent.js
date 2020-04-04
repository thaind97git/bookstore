import React, { useState, useEffect, Fragment } from 'react';
import TablePaginationComponent from '../components/commons/TablePaginationComponent';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import RoleComponent from './RoleComponent';
import StatusComponent from './StatusComponent';
import { Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  GetAllUserAPI,
  getAllUser,
  DeleteUserAPI,
  deleteUser
} from '../stores/UserState';
import { createStructuredSelector } from 'reselect';
import DialogComponent from './commons/DialogComponent';

const connectToRedux = connect(
  createStructuredSelector({
    userData: GetAllUserAPI.dataSelector,
    deleteUserData: DeleteUserAPI.dataSelector
  }),
  (dispatch) => ({
    getAllUser: ({ pageSize, pageIndex }) =>
      dispatch(getAllUser({ pageIndex, pageSize })),
    deleteUser: (id) => dispatch(deleteUser(id))
  })
);

const HEADERS = [
  {
    header: 'Full Name',
    key: 'fullName'
  },
  {
    header: 'Username',
    key: 'username'
  },
  {
    header: 'Role',
    key: 'role'
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

export const UserManagementComponent = ({
  getAllUser,
  userData,
  deleteUserData,
  deleteUser
}) => {
  const [isFetch, setIsFetch] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [idDeleted, setIdDeleted] = useState(null);

  useEffect(() => {
    if (isFetch) {
      getAllUser({ pageIndex, pageSize });
      setIsFetch(false);
    }
  }, [isFetch, getAllUser, pageSize, pageIndex]);

  useEffect(() => {
    setIsFetch(true);
  }, [pageIndex, pageSize]);

  if (!userData) {
    return <Grid />;
  }

  const { content = [], totalElements } = userData;
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
          deleteUser(idDeleted);
          deleteUserData && setIsFetch(true);
          setDialogDelete(false);
        }}
      />
      <CardSimpleLayout
        header="User Management"
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
export default connectToRedux(UserManagementComponent);

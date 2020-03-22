import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TablePaginationComponent from '../components/commons/TablePaginationComponent';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import { GetAllUSerAPI, getAllUSer } from '../stores/ModeratorState';
import { MODERATOR } from '../enums/userType';

const connectToRedux = connect(
  createStructuredSelector({
    allUserData: GetAllUSerAPI.dataSelector
  }),
  dispatch => ({
    getAllUSer: ({ pageSize, pageIndex }) =>
      dispatch(getAllUSer({ pageIndex, pageSize }))
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
  }
];

const DATA = [
  {
    fullName: 'Nguyen Dinh Thai',
    username: 'judonguyen',
    role: 'Admin',
    status: 'Active'
  },
  {
    fullName: 'Nguyen Dinh Thai',
    username: 'judonguyen',
    role: 'Admin',
    status: 'Active'
  },
  {
    fullName: 'Nguyen Dinh Thai',
    username: 'judonguyen',
    role: 'Admin',
    status: 'Active'
  },
  {
    fullName: 'Nguyen Dinh Thai',
    username: 'judonguyen',
    role: 'Admin',
    status: 'Active'
  },
  {
    fullName: 'Nguyen Dinh Thai',
    username: 'judonguyen',
    role: 'Admin',
    status: 'Active'
  },
  {
    fullName: 'Nguyen Dinh Thai',
    username: 'judonguyen',
    role: 'Admin',
    status: 'Active'
  },
  {
    fullName: 'Nguyen Dinh Thai',
    username: 'judonguyen',
    role: 'Admin',
    status: 'Active'
  },
  {
    fullName: 'Nguyen Dinh Thai',
    username: 'judonguyen',
    role: 'Admin',
    status: 'Active'
  },
  {
    fullName: 'Nguyen Dinh Thai',
    username: 'judonguyen',
    role: 'Admin',
    status: 'Active'
  },
  {
    fullName: 'Nguyen Dinh Thai',
    username: 'judonguyen',
    role: 'Admin',
    status: 'Active'
  }
];

export const ModeratorManagementComponent = ({ getAllUSer, allUserData }) => {
  const [isFetch, setIsFetch] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    if (isFetch) {
      getAllUSer({ pageIndex, pageSize });
      setIsFetch(false);
    }
  }, [isFetch, getAllUSer, pageSize, pageIndex]);

  useEffect(() => {
    setIsFetch(true);
  }, [pageIndex, pageSize]);
  if (!allUserData) {
    return <Grid />;
  }
  const moderatorData =
    allUserData.filter(user => user.role === MODERATOR) || [];
  return (
    <CardSimpleLayout
      header="User Management"
      body={
        <TablePaginationComponent
          headers={HEADERS}
          onChangePageSize={(pageIndex, pageSize) => {
            setPageSize(pageSize);
            setPageIndex(pageIndex);
          }}
          rows={moderatorData}
          striped
        />
      }
    />
  );
};
export default connectToRedux(ModeratorManagementComponent);

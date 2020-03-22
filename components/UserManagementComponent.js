import React from 'react';
import TablePaginationComponent from '../components/commons/TablePaginationComponent';
import CardSimpleLayout from '../layouts/CardSimpleLayout';

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

export const UserManagementComponent = () => {
  return (
    <CardSimpleLayout
      header="User Management"
      body={
        <TablePaginationComponent
          headers={HEADERS}
          onChangePageSize={(pageIndex, pageSize) => {
            console.log({ pageIndex, pageSize });
          }}
          rows={DATA}
          striped
        />
      }
    />
  );
};
export default UserManagementComponent;

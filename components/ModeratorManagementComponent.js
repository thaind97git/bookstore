import React, { useState, useEffect, Fragment } from 'react';
import { Grid, Button, makeStyles, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import TablePaginationComponent from '../components/commons/TablePaginationComponent';
import CardSimpleLayout from '../layouts/CardSimpleLayout';
import { GetAllModeratorAPI, getAllModerator } from '../stores/ModeratorState';
import StatusComponent from './StatusComponent';
import RoleComponent from './RoleComponent';
import DialogComponent from './commons/DialogComponent';
import { deleteUser, DeleteUserAPI } from '../stores/UserState';
import RLink from '../layouts/RLink';

const connectToRedux = connect(
  createStructuredSelector({
    moderatorData: GetAllModeratorAPI.dataSelector,
    deleteUserData: DeleteUserAPI.dataSelector
  }),
  (dispatch) => ({
    getAllModerator: ({ pageSize, pageIndex }) =>
      dispatch(getAllModerator({ pageIndex, pageSize })),
    deleteUser: (id) => dispatch(deleteUser(id))
  })
);

const RenderTextField = (props) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      style={{ margin: '10px 0' }}
      fullWidth
      size="small"
      InputLabelProps={{
        shrink: true
      }}
    />
  );
};

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

export const ModeratorManagementComponent = ({
  getAllModerator,
  moderatorData,
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
      getAllModerator({ pageIndex, pageSize });
      setIsFetch(false);
    }
  }, [isFetch, getAllModerator, pageSize, pageIndex]);

  useEffect(() => {
    setIsFetch(true);
  }, [pageIndex, pageSize]);

  if (!moderatorData) {
    return <Grid />;
  }

  const { content = [], totalElements } = moderatorData;

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
          console.log({ idDeleted });
          deleteUser(idDeleted);
          deleteUserData && setIsFetch(true);
          setDialogDelete(false);
        }}
      />
      {/* <DialogComponent
        size="xs"
        isOpenDialog={dialogUpdate}
        setIsOpenDialog={setDialogUpdate}
        title={'Update Moderator'}
        isFooter={false}
        content={
          <form onSubmit={onSubmitUpdate}>
            <Grid container>
              <Grid item xs={12}>
                <RenderTextField
                  required
                  name="email"
                  label="Email"
                  // defaultValue={currentUserData.email}
                />
              </Grid>
              <Grid item xs={12}>
                <RenderTextField
                  name="last_name"
                  label="Lastname"
                  // defaultValue={currentUserData.last_name}
                />
              </Grid>
              <Grid item xs={12}>
                <RenderTextField
                  name="first_name"
                  label="Firstname"
                  // defaultValue={currentUserData.first_name}
                />
              </Grid>
              <Grid item xs={12}>
                <RenderTextField
                  name="tel"
                  label="Tel"
                  // defaultValue={currentUserData.tel}
                />
              </Grid>
              <Grid item xs={12}>
                <RenderTextField
                  required
                  name="password_now"
                  label="Password"
                  autoComplete="on"
                  type="password"
                />
              </Grid>
              <Grid container justify="center" item xs={12}>
                <Button color="primary" variant="contained" type="submit">
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        }
      /> */}

      <CardSimpleLayout
        header={
          <Grid container justify="space-between">
            <span>Moderator Management</span>
            <RLink href="/admin/moderator/add-new">
              <Button
                size="small"
                variant="contained"
                color="primary"
                disableElevation
              >
                Add New Moderator
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
export default connectToRedux(ModeratorManagementComponent);

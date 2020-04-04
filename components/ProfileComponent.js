import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'recompose';
import { Grid, TextField, Button } from '@material-ui/core';

import CardSimpleLayout from '../layouts/CardSimpleLayout';
import { GetCurrentUserAPI } from '../stores/UserState';
import { getObjectValuesFormWithEvent } from '../utils';
import RoleComponent from './RoleComponent';
import DialogComponent from './commons/DialogComponent';

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

const connectToRedux = connect(
  createStructuredSelector({
    currentUserData: GetCurrentUserAPI.dataSelector
    // changeProfileData: ChangeProfileUserAPI.dataSelector
  }),
  (dispatch) => ({
    // changeProfile: (values) => dispatch(changeProfileUser(values)),
    // getCurrentUser: () => dispatch(getCurrentUser()),
    // resetData: () => dispatch(ChangeProfileUserAPIResetter)
  })
);

const enhance = compose(connectToRedux);

const CardMyProfileComponent = ({
  currentUserData = {},
  // changeProfile,
  getCurrentUser,
  changeProfileData,
  resetData
}) => {
  const [openForm, setOpenForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [objectValues, setObjectValues] = useState({});

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenForm(false);
    setOpenDialog(true);
    setObjectValues(
      getObjectValuesFormWithEvent(
        ['email', 'password_now', 'last_name', 'first_name', 'tel'],
        event
      )
    );
  };

  // useEffect(() => {
  //   if (changeProfileData && !changeProfileData.error) {
  //     getCurrentUser();
  //   }
  //   return () => {
  //     resetData();
  //   };
  // }, [getCurrentUser, changeProfileData, resetData]);

  const onCallAPI = () => {
    // changeProfile(objectValues);
  };
  if (!currentUserData) {
    return <Grid />;
  }

  return (
    <Fragment>
      {/* <DialogComponent
        size="xs"
        isOpenDialog={openDialog}
        setIsOpenDialog={setOpenDialog}
        title="Update your profile"
        onCancel={() => {
          setOpenForm(true);
          setOpenDialog(false);
        }}
        onOk={() => {
          setOpenDialog(false);
          onCallAPI();
          setObjectValues({});
        }}
      />
      <DialogComponent
        size="xs"
        isOpenDialog={openForm}
        setIsOpenDialog={setOpenForm}
        title="Your profile"
        isFooter={false}
        content={
          <form onSubmit={onSubmit}>
            <Grid container>
              <Grid item xs={12}>
                <RenderTextField
                  required
                  name="email"
                  label={t('wallet.mypage.change_profile.new_email')}
                  defaultValue={currentUserData.email}
                />
              </Grid>
              <Grid item xs={12}>
                <RenderTextField
                  name="last_name"
                  label={t('wallet.mypage.change_profile.new_last_name')}
                  defaultValue={currentUserData.last_name}
                />
              </Grid>
              <Grid item xs={12}>
                <RenderTextField
                  name="first_name"
                  label={t('wallet.mypage.change_profile.new_first_name')}
                  defaultValue={currentUserData.first_name}
                />
              </Grid>
              <Grid item xs={12}>
                <RenderTextField
                  name="tel"
                  label={t('wallet.mypage.change_profile.new_tel')}
                  defaultValue={currentUserData.tel}
                />
              </Grid>
              <Grid item xs={12}>
                <RenderTextField
                  required
                  name="password_now"
                  label={t('wallet.mypage.otp.enter_password')}
                  autoComplete="on"
                  type="password"
                />
              </Grid>
              <Grid container justify="center" item xs={12}>
                <Button color="primary" variant="contained" type="submit">
                  {t('wallet.kyc_papers.update')}
                </Button>
              </Grid>
            </Grid>
          </form>
        }
      /> */}
      <CardSimpleLayout
        header={<b>Your Profile</b>}
        body={
          <div>
            <Grid container>
              <Grid item xs={12}>
                <RenderTextField
                  label="Fullname"
                  value={currentUserData.fullName}
                  inputProps={{ readOnly: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <RenderTextField
                  label="Username"
                  inputProps={{ readOnly: true }}
                  value={currentUserData.username}
                />
              </Grid>
              <Grid item xs={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <h3>Role: </h3> <RoleComponent type={currentUserData.role} />
                </div>
              </Grid>
              <Grid container justify="center" item xs={12}>
                <Button
                  onClick={() => setOpenForm(true)}
                  color="primary"
                  variant="contained"
                >
                  Update your profile
                </Button>
              </Grid>
            </Grid>
          </div>
        }
      />
    </Fragment>
  );
};

export default enhance(CardMyProfileComponent);

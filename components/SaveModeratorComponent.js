import React, { useState } from 'react';
import 'date-fns';
import { connect } from 'react-redux';
import {
  Grid,
  TextField,
  Button,
  Container,
  FormControl
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CardSimpleLayout from '../layouts/CardSimpleLayout';
import { getObjectValuesFormWithEvent } from '../utils';
import DialogComponent from './commons/DialogComponent';
import { TOAST_ERROR, TOAST_SUCCESS } from '../enums/actions';
import { saveModerator } from '../stores/ModeratorState';
import { MODERATOR } from '../enums/userType';

const RenderTextField = (props) => {
  return (
    <TextField
      {...props}
      variant="outlined"
      style={{ margin: '10px 0' }}
      fullWidth
      InputLabelProps={{
        shrink: true
      }}
    />
  );
};

const connectToRedux = connect(null, (dispatch) => ({
  createNewModerator: (object) => dispatch(saveModerator(object)),
  displayToast: (message, type = TOAST_SUCCESS) =>
    dispatch({
      type: type,
      notification: {
        message
      }
    })
}));

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  },
  input: {
    display: 'none'
  },
  labelMargin: {
    marginBottom: 4
  }
}));

const SaveBookComponent = ({ createNewModerator }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [objectValues, setObjectValues] = useState({});

  const onCallAPI = () => {
    objectValues.role = MODERATOR;
    createNewModerator(objectValues);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenDialog(true);
    setObjectValues(
      getObjectValuesFormWithEvent(['fullName', 'username', 'password'], event)
    );
  };
  return (
    <Container>
      <DialogComponent
        size="xs"
        isOpenDialog={openDialog}
        setIsOpenDialog={setOpenDialog}
        title="Create New Moderator"
        onOk={() => {
          onCallAPI();
          setOpenDialog(false);
        }}
      />
      <CardSimpleLayout
        header={<b>Create new Moderator</b>}
        body={
          <form
            onSubmit={onSubmit}
            id="create-new-moderator-form"
            autoComplete="off"
          >
            <Grid container>
              <Grid item xs={12}>
                <h4 className={classes.labelMargin}>Full name</h4>
                <FormControl fullWidth required>
                  <RenderTextField size="small" required name="fullName" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <h4 className={classes.labelMargin}>Username</h4>
                <FormControl fullWidth required>
                  <RenderTextField size="small" required name="username" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <h4 className={classes.labelMargin}>Password</h4>
                <FormControl fullWidth required>
                  <RenderTextField
                    size="small"
                    type="password"
                    required
                    name="password"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <h4 className={classes.labelMargin}>Role</h4>
                <FormControl>
                  <Button variant="contained" color="secondary">
                    Moderator
                  </Button>
                </FormControl>
              </Grid>

              <Grid container justify="center" item xs={12}>
                <Button type="submit" color="primary" variant="contained">
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        }
      />
    </Container>
  );
};

export default connectToRedux(SaveBookComponent);

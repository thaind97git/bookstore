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
import { saveCategory } from '../stores/CategoryState';

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
  createNewCategory: (object) => dispatch(saveCategory(object))
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

const SaveBookComponent = ({ createNewCategory }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [objectValues, setObjectValues] = useState({});

  const onCallAPI = () => {
    createNewCategory(objectValues);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setOpenDialog(true);
    setObjectValues(
      getObjectValuesFormWithEvent(['name', 'description'], event)
    );
  };
  return (
    <Container>
      <DialogComponent
        size="xs"
        isOpenDialog={openDialog}
        setIsOpenDialog={setOpenDialog}
        title="Create New Category"
        onOk={() => {
          onCallAPI();
          setOpenDialog(false);
        }}
      />
      <CardSimpleLayout
        header={<b>Create new Category</b>}
        body={
          <form
            onSubmit={onSubmit}
            id="create-new-category-form"
            autoComplete="off"
          >
            <Grid container>
              <Grid item xs={12}>
                <h4 className={classes.labelMargin}>Name</h4>
                <FormControl fullWidth required>
                  <RenderTextField size="small" required name="name" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <h4 className={classes.labelMargin}>Desription</h4>
                <FormControl fullWidth required>
                  <RenderTextField size="small" required name="description" />
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

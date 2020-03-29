import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Grid,
  TextField,
  Button,
  Container,
  Select,
  MenuItem,
  Input,
  Chip,
  FormControl,
  ListItemText,
  OutlinedInput
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import CardSimpleLayout from '../layouts/CardSimpleLayout';
import { SaveBookAPI, saveBook } from '../stores/BookState';
import { getObjectValuesFormWithEvent } from '../utils';
import DialogComponent from './commons/DialogComponent';
import { getAllCategories, GetAllCategoriesAPI } from '../stores/CategoryState';
import { CheckBox, CloudUpload } from '@material-ui/icons';

const RenderTextField = props => {
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

const connectToRedux = connect(
  createStructuredSelector({
    createNewBook: SaveBookAPI.dataSelector,
    allCategoriesData: GetAllCategoriesAPI.dataSelector
  }),
  dispatch => ({
    createNewBook: values => dispatch(saveBook(values)),
    getAllCategories: () => dispatch(getAllCategories())
    // resetData: () => dispatch(ChangePasswordUserAPIResetter)
  })
);

const useStyles = makeStyles(theme => ({
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

const SaveBookComponent = ({
  createNewBook,
  createNewBookData,
  getAllCategories,
  allCategoriesData
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [objectValues, setObjectValues] = useState({});
  const [error, setError] = useState('');
  const [categories, setCategories] = React.useState([]);

  const [isFetch, setISFetch] = useState(true);

  useEffect(() => {
    if (isFetch) {
      getAllCategories();
      setISFetch(false);
    }
  }, [isFetch, getAllCategories]);

  const onCallAPI = () => {
    saveBook(objectValues);
    setNewPassword('');
    document.getElementById('change_password_form').reset();
  };

  const onSubmit = event => {
    event.preventDefault();
    if (!error) {
      setOpenDialog(true);
      setObjectValues(
        getObjectValuesFormWithEvent(
          ['password', 'password_confirmation', 'password_now'],
          event
        )
      );
    }
  };
  const handleChange = event => {
    setCategories(event.target.value);
  };

  if (!allCategoriesData) {
    return <Grid />;
  }
  return (
    <Container>
      <DialogComponent
        size="xs"
        isOpenDialog={openDialog}
        setIsOpenDialog={setOpenDialog}
        title="Create New Book"
        c
        onOk={() => {
          onCallAPI();
          setOpenDialog(false);
        }}
      />
      <CardSimpleLayout
        header={<b>Create new Book</b>}
        body={
          <form
            onSubmit={onSubmit}
            id="create-new-book-form"
            autoComplete="off"
          >
            <Grid container>
              <Grid item xs={12}>
                <h4 className={classes.labelMargin}>Book name</h4>
                <FormControl fullWidth required>
                  <RenderTextField required name="name" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <h4 className={classes.labelMargin}>Image</h4>
                <FormControl fullWidth required>
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      startIcon={<CloudUpload />}
                    >
                      Upload
                    </Button>
                  </label>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <h4 className={classes.labelMargin}>Categories</h4>
                <FormControl fullWidth required margin="dense">
                  <Select
                    fullWidth
                    id="demo-mutiple-chip"
                    variant="outlined"
                    multiple
                    value={categories}
                    onChange={handleChange}
                    input={
                      <OutlinedInput name="age" id="outlined-age-simple" />
                    }
                    renderValue={selected => (
                      <div className={classes.chips}>
                        {selected.map(value => {
                          const itemSelected = allCategoriesData.find(
                            cate => cate.id === value
                          );
                          return (
                            <Chip
                              key={value}
                              label={itemSelected.name}
                              className={classes.chip}
                            />
                          );
                        })}
                      </div>
                    )}
                    inputProps={{}}
                    // MenuProps={MenuProps}
                  >
                    {allCategoriesData.map((category = {}) => (
                      <MenuItem
                        key={category.id}
                        value={category.id}
                        style={getStyles(category.name, categories, theme)}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <h4 className={classes.labelMargin}>Description</h4>
                <FormControl fullWidth required>
                  <RenderTextField required name="description" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <h4 className={classes.labelMargin}>Description</h4>
                <FormControl fullWidth required>
                  <RenderTextField required name="description" />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <h4 className={classes.labelMargin}>abc</h4>
                <FormControl fullWidth required>
                  <RenderTextField required name="password_now" label="abc" />
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

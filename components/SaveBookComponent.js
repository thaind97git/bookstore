import React, { useState, useEffect } from 'react';
import 'date-fns';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  Grid,
  TextField,
  Button,
  Container,
  FormControl,
  InputAdornment,
  NativeSelect,
  InputBase
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import CardSimpleLayout from '../layouts/CardSimpleLayout';
import { SaveBookAPI, saveBook } from '../stores/BookState';
import { getObjectValuesFormWithEvent, isImage } from '../utils';
import DialogComponent from './commons/DialogComponent';
import { getAllCategories, GetAllCategoriesAPI } from '../stores/CategoryState';
import { CloudUpload } from '@material-ui/icons';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { TOAST_ERROR, TOAST_SUCCESS } from '../enums/actions';
import { getToken } from '../libs/token-libs';

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
    createNewBook: formData => dispatch(saveBook(formData)),
    getAllCategories: () => dispatch(getAllCategories()),
    displayToast: (message, type = TOAST_SUCCESS) =>
      dispatch({
        type: type,
        notification: {
          message
        }
      })
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

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);

const SaveBookComponent = ({
  getAllCategories,
  allCategoriesData,
  displayToast
}) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [objectValues, setObjectValues] = useState({});
  const [categoryId, setCategoryId] = React.useState('');

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const [isFetch, setISFetch] = useState(true);

  useEffect(() => {
    if (isFetch) {
      getAllCategories();
      setISFetch(false);
    }
  }, [isFetch, getAllCategories]);

  const onCallAPI = () => {
    if (!isImage(objectValues.coverPicture)) {
      displayToast('Please choose a file with the correct type!', TOAST_ERROR);
      return;
    }
    objectValues.coverPicture = document.getElementById(
      'image-button-file'
    ).files[0];
    const formData = new FormData();
    for (let key in objectValues) {
      formData.append(key, objectValues[key]);
    }

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${getToken()}`);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formData
    };

    fetch('http://18.162.144.250:8080/book', requestOptions)
      .then(response => response.text())
      .then((result = {}) => {
        if (result.status === 200 || result.status === 201) {
          setCategoryId('');
          document.getElementById('create-new-book-form').reset();
          displayToast('Create new Book success!');
        } else {
          displayToast('Create new Book fail!', TOAST_ERROR);
        }
      })
      .catch(() => displayToast('Create new Book fail!', TOAST_ERROR));
  };

  const onSubmit = event => {
    event.preventDefault();
    setOpenDialog(true);
    setObjectValues(
      getObjectValuesFormWithEvent(
        [
          'isbn',
          'title',
          'author',
          'publisher',
          'price',
          'coverPicture',
          'categoryId',
          'description',
          'firstReleased'
        ],
        event
      )
    );
  };
  const handleChange = event => {
    setCategoryId(event.target.value);
  };

  if (!allCategoriesData) {
    return <Grid />;
  }
  return (
    <Container>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DialogComponent
          size="xs"
          isOpenDialog={openDialog}
          setIsOpenDialog={setOpenDialog}
          title="Create New Book"
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
                  <h4 className={classes.labelMargin}>Isbn</h4>
                  <FormControl fullWidth required>
                    <RenderTextField size="small" required name="isbn" />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>Title</h4>
                  <FormControl fullWidth required>
                    <RenderTextField size="small" required name="title" />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>Author</h4>
                  <FormControl fullWidth required>
                    <RenderTextField size="small" required name="author" />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>Publisher</h4>
                  <FormControl fullWidth required>
                    <RenderTextField size="small" required name="publisher" />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>Price</h4>
                  <FormControl fullWidth required>
                    <RenderTextField
                      name="price"
                      type="number"
                      inputProps={{
                        min: 0,
                        step: 'any'
                      }}
                      required
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">$</InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>Image</h4>
                  <FormControl fullWidth required>
                    <input
                      name="coverPicture"
                      accept="image/*"
                      className={classes.input}
                      id="image-button-file"
                      multiple
                      type="file"
                      onChange={event => {
                        const bookImage = event.target.value;
                        if (!bookImage || !isImage(bookImage)) {
                          displayToast(
                            'Please choose a file with the correct type!',
                            TOAST_ERROR
                          );
                        } else {
                          displayToast('Upload file success!');
                        }
                      }}
                    />
                    <label
                      style={{ width: 'fit-content' }}
                      htmlFor="image-button-file"
                    >
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
                    <NativeSelect
                      fullWidth
                      name="categoryId"
                      value={categoryId}
                      onChange={handleChange}
                      input={<BootstrapInput />}
                    >
                      <option value="" />
                      {allCategoriesData.map((category = {}) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </NativeSelect>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>Description</h4>
                  <FormControl fullWidth required>
                    <RenderTextField required name="description" />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>First time released</h4>
                  <FormControl fullWidth required>
                    <KeyboardDatePicker
                      name="firstReleased"
                      margin="normal"
                      id="date-picker-dialog"
                      format="yyyy-MM-dd"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
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
      </MuiPickersUtilsProvider>
    </Container>
  );
};

export default connectToRedux(SaveBookComponent);

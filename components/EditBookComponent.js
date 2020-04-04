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
import {
  SaveBookAPI,
  saveBook,
  getBookDetails,
  GetBookDetailsAPI
} from '../stores/BookState';
import { getObjectValuesFormWithEvent, isImage, toDataURL } from '../utils';
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
import Router, { useRouter } from 'next/router';

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

const connectToRedux = connect(
  createStructuredSelector({
    createNewBook: SaveBookAPI.dataSelector,
    allCategoriesData: GetAllCategoriesAPI.dataSelector,
    bookDetailsData: GetBookDetailsAPI.dataSelector
  }),
  (dispatch) => ({
    createNewBook: (formData) => dispatch(saveBook(formData)),
    getAllCategories: () => dispatch(getAllCategories()),
    getBookDetails: (isbn) => dispatch(getBookDetails(isbn)),
    displayToast: (message, type = TOAST_SUCCESS) =>
      dispatch({
        type: type,
        notification: {
          message
        }
      })
  })
);

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
  },
  image: {
    width: 240,
    margin: '0 20px'
  }
}));

const BootstrapInput = withStyles((theme) => ({
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

const EditBookComponent = ({
  getAllCategories,
  allCategoriesData,
  displayToast,
  bookDetailsData,
  getBookDetails
}) => {
  const classes = useStyles();
  const router = useRouter();
  const { isbn } = router.query || {};
  const [openDialog, setOpenDialog] = useState(false);
  const [objectValues, setObjectValues] = useState({});
  const [currentBase64, setCurrentBase64] = useState('');
  const [isFetch, setIsFetch] = useState(true);

  useEffect(() => {
    if (isFetch) {
      getAllCategories();
      getBookDetails(isbn);
      setIsFetch(false);
    }
  }, [isFetch, getAllCategories, router, isbn, getBookDetails]);

  useEffect(() => {
    if (bookDetailsData) {
      setCurrentBase64(
        `data:image/jpeg;base64,${bookDetailsData.coverPicture}`
      );
    }
  }, [bookDetailsData]);
  if (!bookDetailsData) {
    return <Grid />;
  }

  const onCallAPI = () => {
    const requestObject = {};

    const newImage = document.getElementById('image-button-file').files[0];

    if (newImage) {
      requestObject.coverPicture = newImage;
    }

    requestObject.book = {
      title: objectValues.title,
      author: objectValues.author,
      publisher: objectValues.publisher,
      price: objectValues.value,
      categoryId: objectValues.categoryId,
      description: objectValues.description,
      firstReleased: objectValues.firstReleased
    };
    requestObject.isbn = objectValues.isbn;

    const formData = new FormData();
    for (let key in requestObject) {
      if (typeof requestObject[key] === 'object') {
        requestObject[key] = JSON.stringify(requestObject[key]);
      }
      formData.append(key, requestObject[key]);
    }

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${getToken()}`);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formData
    };

    fetch(
      `http://18.162.144.250:8080/book/${objectValues.isbn}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result = {}) => {
        if (
          result.status === 200 ||
          result.status === 201 ||
          result.status <= 250
        ) {
          Router.push('/admin/book');
          displayToast('Update Book success!');
        } else {
          displayToast('Update Book fail!', TOAST_ERROR);
        }
      })
      .catch(() => displayToast('Update Book fail!', TOAST_ERROR));
  };

  const onSubmit = (event) => {
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
          title="Update this Book"
          onOk={() => {
            onCallAPI();
            setOpenDialog(false);
          }}
        />
        <CardSimpleLayout
          header={<b>Edit Book</b>}
          body={
            <form onSubmit={onSubmit} id="edit-book-form" autoComplete="off">
              <Grid container>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>Isbn</h4>
                  <FormControl fullWidth required>
                    <RenderTextField
                      disabled
                      defaultValue={bookDetailsData.isbn}
                      size="small"
                      required
                      name="isbn"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>Title</h4>
                  <FormControl fullWidth required>
                    <RenderTextField
                      defaultValue={bookDetailsData.title}
                      size="small"
                      required
                      name="title"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>Author</h4>
                  <FormControl fullWidth required>
                    <RenderTextField
                      defaultValue={bookDetailsData.author}
                      size="small"
                      required
                      name="author"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>Publisher</h4>
                  <FormControl fullWidth required>
                    <RenderTextField
                      defaultValue={bookDetailsData.publisher}
                      size="small"
                      required
                      name="publisher"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>Price</h4>
                  <FormControl fullWidth required>
                    <RenderTextField
                      defaultValue={bookDetailsData.price}
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
                    <div style={{ display: 'flex' }}>
                      <input
                        name="coverPicture"
                        accept="image/*"
                        className={classes.input}
                        id="image-button-file"
                        multiple
                        type="file"
                        onChange={(event) => {
                          const bookImage = event.target.value;
                          if (!bookImage || !isImage(bookImage)) {
                            displayToast(
                              'Please choose a file with the correct type!',
                              TOAST_ERROR
                            );
                          } else {
                            const newImage = document.getElementById(
                              'image-button-file'
                            ).files[0];
                            if (newImage) {
                              toDataURL(newImage, (result) => {
                                setCurrentBase64(result);
                              });
                            }
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
                          Upload New Image
                        </Button>
                      </label>
                      <img
                        className={classes.image}
                        src={currentBase64}
                        alt=""
                      ></img>
                    </div>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>Categories</h4>
                  <FormControl fullWidth required margin="dense">
                    <NativeSelect
                      fullWidth
                      name="categoryId"
                      defaultValue={bookDetailsData.categoryId}
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
                    <RenderTextField
                      defaultValue={bookDetailsData.description}
                      required
                      name="description"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <h4 className={classes.labelMargin}>First time released</h4>
                  <FormControl fullWidth required>
                    <KeyboardDatePicker
                      defaultValue={new Date(bookDetailsData.firstReleased)}
                      name="firstReleased"
                      margin="normal"
                      id="date-picker-dialog"
                      format="yyyy-MM-dd"
                      value={new Date(bookDetailsData.firstReleased)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid container justify="center" item xs={12}>
                  <Button type="submit" color="primary" variant="contained">
                    Save
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

export default connectToRedux(EditBookComponent);

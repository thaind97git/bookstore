import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  Typography,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  Button
} from '@material-ui/core';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { GetBookDetailsAPI, getBookDetails } from '../stores/BookState';
import { ExpandMore } from '@material-ui/icons';
import moment from 'moment';
import DialogComponent from './commons/DialogComponent';
import clsx from 'clsx';
import { get } from 'lodash/fp';
import { ADD_TO_CART } from '../stores/CartState';
import { TOAST_ERROR, TOAST_SUCCESS } from '../enums/actions';

const connectToRedux = connect(
  createStructuredSelector({
    bookDetailsData: GetBookDetailsAPI.dataSelector,
    shopingCart: get('shopingCart')
  }),
  (dispatch) => ({
    getBookDetails: (isbn) => dispatch(getBookDetails(isbn)),
    addToCart: ({ book, quantity }) =>
      dispatch({ type: ADD_TO_CART, payload: { book, quantity } }),
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
  detailsSection: {
    marginTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    minHeight: '80vh'
  },
  media: {
    height: 0,
    paddingTop: '100%' // 16:9
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  cardContent: {
    flexGrow: 1
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  },
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    width: '25ch'
  }
}));
const BookDetailsComponent = ({
  getBookDetails,
  bookDetailsData,
  shopingCart = [],
  addToCart,
  displayToast
}) => {
  const router = useRouter();
  const [isFetch, setIsFetch] = useState(true);
  const classes = useStyles();
  const [quantity, setQuantity] = useState('');
  const [dialog, setDialog] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (isFetch) {
      const { isbn } = router.query || {};
      getBookDetails(isbn);
      setIsFetch(false);
    }
  }, [isFetch, getBookDetails, router]);
  if (!bookDetailsData) {
    return (
      <Grid
        justify="center"
        alignItems="center"
        container
        style={{ minHeight: '80vh' }}
      >
        <Grid style={{ fontSize: 50, opacity: 0.4 }}>Not found any book!</Grid>
      </Grid>
    );
  }
  return (
    <Container className={classes.detailsSection}>
      <DialogComponent
        size="xs"
        isOpenDialog={dialog}
        setIsOpenDialog={setDialog}
        content={
          <TextField
            inputProps={{
              min: 0
            }}
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            type="number"
            label="Quantity"
            id="outlined-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            helperText={error}
            error={error ? true : false}
          />
        }
        onCancel={() => {
          setDialog(false);
        }}
        onOk={() => {
          if (!quantity) {
            displayToast('Please input quantity', TOAST_ERROR);
            return;
          }
          const quantityAdded = (shopingCart || []).reduce((prev, current) => {
            return prev + current.quantity;
          }, 0);
          if (Number(quantityAdded) + Number(quantity) > 15) {
            setError('Sorry, you just can buy 15 items in a order!');
            return;
          }
          setError('');
          setQuantity('');
          typeof addToCart === 'function' &&
            addToCart({ book: bookDetailsData, quantity });
          setDialog(false);
        }}
      />
      <Grid container>
        <Grid item sm={12} md={4}>
          <img
            src={`data:image/jpeg;base64,${bookDetailsData.coverPicture}`}
            alt=""
            style={{
              minWidth: 228,
              minHeight: 346,
              width: '80%',
              boxShadow: '3px 3px 5px 3px #ccc'
            }}
          />
        </Grid>
        <Grid item sm={12} md={8}>
          <div style={{ margin: '24px 0' }}>
            <Typography variant="h4" component="h1">
              {bookDetailsData.title}
              <span style={{ color: '#6b6b70', fontSize: 24 }}>
                {' '}
                -{' '}
                {moment(new Date(bookDetailsData.firstReleased)).format(
                  'MMM MM,YYYY'
                )}
              </span>
            </Typography>
            <Typography variant="h6" component="h1">
              by{' '}
              <a
                href={`https://www.google.com/search?q=${bookDetailsData.author}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {bookDetailsData.author}
              </a>{' '}
              (Author)
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              component="h1"
            >
              Publisher: {bookDetailsData.publisher}
            </Typography>
          </div>
          <Divider />
          <span></span>
          <Typography variant="h4" style={{ margin: '20px 10px 20px 0px' }}>
            Price: $ {bookDetailsData.price}
          </Typography>
          <Button
            style={{ margin: '10px 0px' }}
            onClick={() => setDialog(true)}
            variant="contained"
            color="primary"
          >
            Add To Cart
          </Button>
          <ExpansionPanel style={{ background: 'transparent' }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Book Description
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>{bookDetailsData.description}</Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    </Container>
  );
};
export default connectToRedux(BookDetailsComponent);

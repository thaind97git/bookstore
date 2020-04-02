import React, { Fragment, useState } from 'react';
import {
  IconButton,
  CardHeader,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  Tooltip,
  TextField
} from '@material-ui/core';
import { AddShoppingCart, NavigateNext } from '@material-ui/icons';
import RLink from '../layouts/RLink';
import { getShortString } from '../utils';
import DialogComponent from './commons/DialogComponent';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';

const connectToRedux = connect(pick(['shopingCart']));
const useStyles = makeStyles(theme => ({
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

const CardBookComponent = ({ book, addToCart, shopingCart = [] }) => {
  const classes = useStyles();

  const [quantity, setQuantity] = useState('');
  const [dialog, setDialog] = useState(false);
  const [error, setError] = useState('');
  return (
    <Fragment>
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
            onChange={event => setQuantity(event.target.value)}
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
          const quantityAdded = (shopingCart || []).reduce((prev, current) => {
            return prev + current.quantity;
          }, 0);
          if (Number(quantityAdded) + Number(quantity) > 15) {
            setError('Sorry, you just can buy 15 items in a order!');
            return;
          }
          setError('');
          setQuantity('');
          typeof addToCart === 'function' && addToCart({ book, quantity });
          setDialog(false);
        }}
      />
      <Card className={classes.root}>
        <CardHeader
          action={
            <Tooltip title="View more" aria-label="add">
              <RLink href={`/details?isbn=${book.isbn}`}>
                <IconButton aria-label="settings">
                  <NavigateNext />
                </IconButton>
              </RLink>
            </Tooltip>
          }
          title={<small>{getShortString(book.title)}</small>}
          subheader={
            <Tooltip title={book.author}>
              <span>{getShortString(book.author, 25)}</span>
            </Tooltip>
          }
        />
        <CardMedia
          className={classes.media}
          image={`data:image/jpeg;base64,${book.coverPicture}`}
          title={book.title}
        />

        <CardContent style={{ minHeight: 100 }}>
          <Typography variant="body2" color="textSecondary" component="p">
            {getShortString(book.description, 150)}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip title="Add to card" aria-label="add">
            <IconButton
              onClick={() => setDialog(true)}
              aria-label="add to favorites"
            >
              <AddShoppingCart />
            </IconButton>
          </Tooltip>
          {book.price} $
        </CardActions>
      </Card>
    </Fragment>
  );
};
export default connectToRedux(CardBookComponent);

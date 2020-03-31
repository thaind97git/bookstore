import React, { useState } from 'react';
import {
  Grid,
  Typography,
  makeStyles,
  Container,
  Paper,
  IconButton,
  InputBase,
  Divider
} from '@material-ui/core';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SearchIcon from '@material-ui/icons/Search';
import { searchOrderByCode, SearchOrderByCodeAPI } from '../stores/OrderState';
import CardOrderDetailsComponent from './CardOrderDetailsComponent';
import { TOAST_ERROR, TOAST_SUCCESS } from '../enums/actions';

const connectToRedux = connect(
  createStructuredSelector({
    orderDetailsData: SearchOrderByCodeAPI.dataSelector
  }),
  dispatch => ({
    searchOrderByCode: ({ code, customerEmail }) =>
      dispatch(searchOrderByCode({ code, customerEmail })),
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
  heroContent: {
    background: 'url(/static/images/order-details-bg.jpg)',
    padding: theme.spacing(8, 0, 6),
    minHeight: '80vh'
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  notFoundBook: {
    margin: `${theme.spacing(7)} auto`
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 600,
    boxShadow: '0 2px 6px rgba(96, 97, 99, 0.28)'
  },
  emailInput: {
    width: 400,
    margin: '10px auto',
    boxShadow: '0 2px 6px rgba(96, 97, 99, 0.28)',
    pading: 10,
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

function HomeComponent({ orderDetailsData, searchOrderByCode, displayToast }) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div style={{ minHeight: '80vh' }}>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            style={{ color: 'white', fontSize: 56, fontWeight: 300 }}
            gutterBottom
          >
            Order Details
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Paper component="div" className={classes.emailInput}>
                  <InputBase
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    style={{ padding: 10, width: '100%' }}
                    placeholder="Input your email"
                    inputProps={{
                      'aria-label': 'Input your email'
                    }}
                  />
                </Paper>
                <Paper
                  onSubmit={event => {
                    event.preventDefault();
                    if (!search) return;
                    if (!email) {
                      displayToast('Please input your email!', TOAST_ERROR);
                      return;
                    }
                    searchOrderByCode({
                      code: search,
                      customerEmail: email
                    });
                  }}
                  component="form"
                  className={classes.root}
                >
                  <InputBase
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                    className={classes.input}
                    placeholder="Search order details by code"
                    inputProps={{
                      'aria-label': 'Search order details by code'
                    }}
                  />

                  <Divider className={classes.divider} orientation="vertical" />
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </Container>
        <Container style={{ paddingTop: 40, paddingBottom: 40 }}>
          <div>
            {orderDetailsData && (
              <CardOrderDetailsComponent orderDetails={orderDetailsData} />
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default connectToRedux(HomeComponent);

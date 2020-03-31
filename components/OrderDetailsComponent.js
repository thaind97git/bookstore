import React, { useState, useEffect } from 'react';
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

const connectToRedux = connect(
  createStructuredSelector({
    orderDetailsData: SearchOrderByCodeAPI.dataSelector
  }),
  dispatch => ({
    searchOrderByCode: ({ code, customerEmail }) =>
      dispatch(searchOrderByCode({ code, customerEmail }))
  })
);

const useStyles = makeStyles(theme => ({
  heroContent: {
    background: 'url(https://d3rd29nk50moi4.cloudfront.net/spacebg.jpg)',
    padding: theme.spacing(8, 0, 6)
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

function HomeComponent({ orderDetailsData, searchOrderByCode, getBooks }) {
  const classes = useStyles();
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');

  // useEffect(() => {
  //   if (isFetch) {
  //     getBooks({ pageSize: 5, pageIndex });
  //     setIsFetch(false);
  //   }
  // }, [isFetch, getBooks, pageIndex]);

  console.log({ orderDetailsData });

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
          {/* <Typography
            variant="h5"
            align="center"
            paragraph
            style={{ color: 'white' }}
          >
            Input your code to view full details
          </Typography> */}
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
      </div>
      <Container style={{ paddingTop: 40, paddingBottom: 40 }}>
        {orderDetailsData && (
          <CardOrderDetailsComponent orderDetails={orderDetailsData} />
        )}
      </Container>
    </div>
  );
}

export default connectToRedux(HomeComponent);

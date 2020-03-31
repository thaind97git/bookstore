import React, { useState, useEffect } from 'react';
import {
  Button,
  Grid,
  Typography,
  makeStyles,
  Container,
  Paper,
  InputBase,
  Divider,
  IconButton
} from '@material-ui/core';
import Swiper from 'react-id-swiper';
import { connect } from 'react-redux';
import { ADD_TO_CART } from '../stores/CartState';
import CardBookComponent from './CardBookComponent';
import PaginationComponent from './PaginationComponent';
import {
  getBooks,
  GetBooksAPI,
  searchBook,
  SearchBookAPI,
  GetBooksResettor
} from '../stores/BookState';
import { createStructuredSelector } from 'reselect';
import SearchIcon from '@material-ui/icons/Search';

const connectToRedux = connect(
  createStructuredSelector({
    booksData: GetBooksAPI.dataSelector,
    searchBookData: SearchBookAPI.dataSelector
  }),
  dispatch => ({
    addToCart: ({ book, quantity }) =>
      dispatch({ type: ADD_TO_CART, payload: { book, quantity } }),
    getBooks: ({ pageIndex, pageSize }) =>
      dispatch(getBooks({ pageSize, pageIndex })),
    searchBook: param => dispatch(searchBook(param)),
    getBooksResettor: () => dispatch(GetBooksResettor)
  })
);

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  menu: {
    width: 500,
    height: 64,
    background: 'transparent',
    margin: 'auto'
  },
  menuAction: {
    '&:hover': {
      background: '#ececec'
    }
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
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
    margin: `${theme.spacing(7)}px auto`
  },
  inputSearch: {
    margin: '20px 0',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 6px rgba(96, 97, 99, 0.28)'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  }
}));

function HomeComponent({
  addToCart,
  booksData,
  getBooks,
  searchBook,
  searchBookData,
  getBooksResettor
}) {
  const classes = useStyles();
  const [isFetch, setIsFetch] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (isFetch) {
      getBooks({ pageSize: 5, pageIndex });
      setIsFetch(false);
    }
    return () => {
      getBooksResettor();
    };
  }, [isFetch, getBooks, pageIndex, getBooksResettor]);

  const params = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    imgSlide: {
      width: '50%'
    }
  };

  let { content = [], totalElements = 0 } = booksData || {};
  if (isSearch && searchBookData && searchBookData.length) {
    content = searchBookData;
    totalElements = searchBookData.length;
  }
  return (
    <React.Fragment>
      <div className={classes.heroContent}>
        <Swiper {...params}>
          <img
            className={classes.imgSlide}
            alt=""
            src="/static/images/slide3.png"
          />
          <img
            className={classes.imgSlide}
            alt=""
            src="/static/images/slide3.png"
          />
          <img
            className={classes.imgSlide}
            alt=""
            src="/static/images/slide3.png"
          />
          <img
            className={classes.imgSlide}
            alt=""
            src="/static/images/slide3.png"
          />
        </Swiper>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            The Book Store
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Bookstore gives you an online shopping cart and point-of-sale system
            for your school's bookstore. Online shoppers can browse and purchase
            items via the shopping interface or via Buy Now links for individual
            items embedded on other sites.
          </Typography>
          <div className={classes.heroButtons}>
            <Container>
              <Paper
                onSubmit={event => {
                  event.preventDefault();
                  if (search.length) {
                    setIsSearch(true);
                    searchBook(search);
                  } else {
                    setIsSearch(false);
                    getBooks({ pageSize: 5, pageIndex: 1 });
                  }
                }}
                component="form"
                className={classes.inputSearch}
              >
                <InputBase
                  value={search}
                  onChange={event => {
                    const value = event.target.value;

                    setSearch(value);
                  }}
                  className={classes.input}
                  placeholder="Search Books"
                  inputProps={{
                    'aria-label': 'Search Books'
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
            </Container>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {!content.length ? (
            <h1 className={classes.notFoundBook}>Not found any book</h1>
          ) : (
            content.map((book, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <CardBookComponent addToCart={addToCart} book={book} />
              </Grid>
            ))
          )}
        </Grid>
        <Grid style={{ marginTop: 24 }} container justify="center">
          {!isSearch && (
            <PaginationComponent
              actions={index => {
                setPageIndex(index + 1);
                setIsFetch(true);
              }}
              totalCount={totalElements}
            />
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default connectToRedux(HomeComponent);

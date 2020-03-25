import React from 'react';
import {
  Button,
  Grid,
  Typography,
  makeStyles,
  Container
} from '@material-ui/core';
import Swiper from 'react-id-swiper';
import { connect } from 'react-redux';
import { ADD_TO_CARD } from '../stores/CardState';
import CardBookComponent from './CardBookComponent';
import PaginationComponent from './PaginationComponent';

const connectToRedux = connect(null, dispatch => ({
  addToCard: card => dispatch({ type: ADD_TO_CARD, payload: card })
}));

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
  }
}));

const BOOKS = [
  {
    id: 0,
    name: 'Nerver eat alone',
    description:
      'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
    coverPicture: '/static/images/book1.png',
    price: 10000
  },
  {
    id: 1,
    name: 'Nerver eat alone 1',
    description:
      'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
    coverPicture: '/static/images/book1.png',
    price: 10000
  },
  {
    id: 2,
    name: 'Nerver eat alone 2',
    description:
      'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
    coverPicture: '/static/images/book1.png',
    price: 10000
  },
  {
    id: 3,
    name: 'Nerver eat alone 3',
    description:
      'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
    coverPicture: '/static/images/book1.png',
    price: 10000
  },
  {
    id: 4,
    name: 'Nerver eat alone 4',
    description:
      'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
    coverPicture: '/static/images/book1.png',
    price: 10000
  },
  {
    id: 5,
    name: 'Nerver eat alone 5',
    description:
      'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.',
    coverPicture: '/static/images/book1.png',
    price: 10000
  }
];

function HomeComponent({ bookData = BOOKS, addToCard }) {
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
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* Hero unit */}
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
            Album layout
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Something short and leading about the collection below—its contents,
            the creator, etc. Make it short and sweet, but not too short so
            folks don&apos;t simply skip over it entirely.
          </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="contained" color="primary">
                  Main call to action
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="primary">
                  Secondary action
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {bookData.map((book, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <CardBookComponent addToCard={addToCard} book={book} />
            </Grid>
          ))}
        </Grid>
        <Grid style={{ marginTop: 24 }} container justify="center">
          <PaginationComponent totalCount={bookData.length} />
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default connectToRedux(HomeComponent);

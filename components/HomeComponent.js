import React from 'react';
import {
  IconButton,
  CardHeader,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  makeStyles,
  Container,
  Tooltip
} from '@material-ui/core';
import { Share, AddShoppingCart, NavigateNext } from '@material-ui/icons';
import Swiper from 'react-id-swiper';
import Link from 'next/link';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '100%' // 16:9
    // width:
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
  }
}));

const cards = [1, 2, 3];

export default function HomeComponent() {
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
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map(card => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.root}>
                <CardHeader
                  // avatar={
                  //   <Avatar aria-label="recipe" className={classes.avatar}>
                  //     R
                  //   </Avatar>
                  // }
                  action={
                    <Tooltip title="View more" aria-label="add">
                      <Link href="/details?id=abc">
                        <IconButton aria-label="settings">
                          <NavigateNext />
                        </IconButton>
                      </Link>
                    </Tooltip>
                  }
                  title={<small>Never eat alone</small>}
                  subheader="Keith ferrazzi"
                />
                <CardMedia
                  className={classes.media}
                  image="/static/images/book1.png"
                  title="Paella dish"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <Tooltip title="Add to card" aria-label="add">
                    <IconButton aria-label="add to favorites">
                      <AddShoppingCart />
                    </IconButton>
                  </Tooltip>
                  <IconButton aria-label="share">
                    <Share />
                  </IconButton>
                  {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

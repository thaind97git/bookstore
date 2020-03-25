import React from 'react';
import {
  IconButton,
  CardHeader,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import { AddShoppingCart, NavigateNext } from '@material-ui/icons';
import RLink from '../layouts/RLink';
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
  }
}));

const CardBookComponent = ({ book, addToCard }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Tooltip title="View more" aria-label="add">
            <RLink href={`/details?id=${book.id}`}>
              <IconButton aria-label="settings">
                <NavigateNext />
              </IconButton>
            </RLink>
          </Tooltip>
        }
        title={<small>Never eat alone</small>}
        subheader="Keith ferrazzi"
      />
      <CardMedia
        className={classes.media}
        image={book.coverPicture}
        title="Paella dish"
      />
      {/* <Tooltip title="Click to view full details" aria-label="details">
        <IconButton
          onClick={() => Router.push(`details?id=${book.id}`)}
          aria-label="view details"
        > */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {book.description}
        </Typography>
      </CardContent>
      {/* </IconButton>
      </Tooltip> */}
      <CardActions disableSpacing>
        <Tooltip title="Add to card" aria-label="add">
          <IconButton
            onClick={() => typeof addToCard === 'function' && addToCard(book)}
            aria-label="add to favorites"
          >
            <AddShoppingCart />
          </IconButton>
        </Tooltip>
        {/* <IconButton aria-label="share">
          <Share />
        </IconButton> */}
      </CardActions>
    </Card>
  );
};
export default CardBookComponent;

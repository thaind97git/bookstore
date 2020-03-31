import React, { Fragment } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  Toolbar,
  Typography,
  AppBar,
  withStyles
} from '@material-ui/core';
import { MenuBook, Home, ShoppingCart, Details } from '@material-ui/icons';
import CopyrightComponent from '../components/CopyrightComponent';
import { withRouter } from 'next/router';
import { compose } from 'recompose';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { pick } from 'lodash/fp';
const connectToRedux = connect(pick(['shopingCart']));

const styles = theme => ({
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
  menuActive: {
    color: '#3f51b5'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
});
const enhance = compose(withStyles(styles), withRouter, connectToRedux);

class EmptyPageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuSelected: ''
    };
  }

  onChangeMenuSelected = (event, value) =>
    this.setState({ ...this.state, menuSelected: value });

  render() {
    const { value } = this.state;
    const { classes, children, router, shopingCart } = this.props;
    const MENU_CLIENT = [
      {
        link: '/',
        label: 'Home',
        icon: <Home />
      },
      {
        link: '/details',
        label: 'Categories',
        icon: <MenuBook />
      },
      {
        link: '/shoping-card',
        label: 'Card',
        icon: (
          <Badge
            badgeContent={`${!!shopingCart ? shopingCart.length : 0}`}
            color="secondary"
          >
            <ShoppingCart />
          </Badge>
        )
      },
      {
        link: '/order-details',
        label: 'Order details',
        icon: <Details />
      }
    ];
    return (
      <Fragment>
        <AppBar color="default" position="fixed">
          <Toolbar>
            <img
              style={{ width: 70 }}
              alt=""
              src="/static/images/bookstore.png"
            />
            <Typography variant="h6" color="inherit" noWrap>
              BookStore
            </Typography>
            <BottomNavigation
              showLabels
              value={value}
              onChange={this.onChangeMenuSelected}
              className={classes.menu}
            >
              {MENU_CLIENT.map((item, key) => (
                <BottomNavigationAction
                  key={key}
                  href={item.link}
                  className={clsx(
                    classes.menuAction,
                    router.pathname === item.link && classes.menuActive
                  )}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </BottomNavigation>
          </Toolbar>
        </AppBar>
        <main style={{ paddingTop: 64, background: '#e8eaf5' }}>
          {children}
        </main>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            The book store
          </Typography>
          {/* <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography> */}
          <CopyrightComponent link="http://dev-blogs.netlify.com/">
            Thaind97.dev
          </CopyrightComponent>
        </footer>
      </Fragment>
    );
  }
}

export default enhance(EmptyPageLayout);

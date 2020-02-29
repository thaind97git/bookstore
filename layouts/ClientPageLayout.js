import React, { Fragment } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  Toolbar,
  Typography,
  makeStyles,
  AppBar,
  withStyles
} from '@material-ui/core';
import { MenuBook, Home, ShoppingCart } from '@material-ui/icons';
import CopyrightComponent from '../components/CopyrightComponent';
import { withRouter } from 'next/router';
import { compose } from 'recompose';

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
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6)
  }
});
const enhance = compose(withStyles(styles), withRouter);
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
    const { classes, children, router } = this.props;
    console.log(router.pathname);
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
              <BottomNavigationAction
                href="/"
                className={classes.menuAction}
                label="Home"
                value=""
                icon={<Home />}
              />

              <BottomNavigationAction
                href="/details?id=123"
                className={classes.menuAction}
                label="Categories"
                value="category"
                icon={<MenuBook />}
              />

              <BottomNavigationAction
                href="/shoping-card"
                className={classes.menuAction}
                label="Your Card"
                value="shoping-card"
                icon={
                  <Badge badgeContent={4} color="secondary">
                    <ShoppingCart />
                  </Badge>
                }
              />
            </BottomNavigation>
          </Toolbar>
        </AppBar>
        <main style={{ paddingTop: 64 }}>{children}</main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
          <CopyrightComponent link="http://dev-blogs.netlify.com/">
            Thaind97.dev
          </CopyrightComponent>
        </footer>
      </Fragment>
    );
  }
}

export default enhance(EmptyPageLayout);

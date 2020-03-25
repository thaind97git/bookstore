import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  withStyles,
  MenuItem,
  Menu,
  Divider
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { logOut, GetCurrentUserAPI } from '../stores/UserState';

const connectToRedux = connect(
  createStructuredSelector({
    currentUserData: GetCurrentUserAPI.dataSelector
  }),
  () => ({})
);

const styles = theme => ({
  pl1: {
    paddingLeft: theme.spacing(1) // keep right padding when drawer closed
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    position: 'relative',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  title: {
    flexGrow: 1
  },
  appBarGroupRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  accountName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 36px',
    outline: 'none'
  },
  iconShadow: {
    boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)'
  },
  [theme.breakpoints.down('xs')]: {
    langLabel: {
      display: 'none'
    }
  },
  selectLanguageMobile: {
    display: 'none',
    '@media (max-width: 600px)': {
      display: 'block'
    }
  },
  selectLanguageDesk: {
    display: 'block',
    '@media (max-width: 600px)': {
      display: 'none'
    }
  }
});

const enhance = compose(withStyles(styles), connectToRedux);

class AppBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  handleMenu = event => {
    this.setState({ ...this.state, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ ...this.state, anchorEl: null });
  };

  render() {
    const { title = '', classes, currentUserData } = this.props;
    const { username = '' } = currentUserData || {};
    const { anchorEl } = this.state;
    const openAnchorEl = Boolean(anchorEl);
    return (
      <AppBar
        color="default"
        position="absolute"
        className={clsx(classes.appBar, classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>
          <div className={classes.appBarGroupRight}>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={openAnchorEl}
                onClose={this.handleClose}
              >
                <div className={classes.accountName}>{username}</div>
                <Divider />
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={() => logOut()}>Sign out</MenuItem>
              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default enhance(AppBarComponent);

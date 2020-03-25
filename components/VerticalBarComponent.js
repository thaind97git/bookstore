import {
  ChevronLeft,
  DesktopMac,
  SignalCellularAlt,
  Group,
  Person,
  GraphicEq,
  Menu as MenuIcon
} from '@material-ui/icons';
import {
  Divider,
  List,
  IconButton,
  Drawer,
  makeStyles,
  ListItem,
  ListItemIcon,
  withWidth
} from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { compose } from 'redux';
import { withRouter } from 'next/router';

const drawerWidth = 240;

const enhance = compose(withRouter, withWidth());

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    maxHeight: '100vh',
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('sm')]: {
      height: 55
    }
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7)
  },
  menuButton: {
    marginLeft: -4
  },
  logo: {
    width: 70,
    height: 70,
    marginLeft: theme.spacing(4)
  },
  menuLogoHidden: {
    display: 'none'
  },
  accountClose: {
    display: 'none'
  },
  textPreWrap: {
    whiteSpace: 'pre-wrap'
  },
  menuIcon: {
    minWidth: '40px'
  },
  menuActive: {
    color: '#5e2dd8'
  }
}));

const VerticalBarComponent = ({ open, setOpen, router, width }) => {
  const handleDrawerResponsive = size => {
    if (!['md', 'lg', 'xl'].includes(size)) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  React.useEffect(() => {
    handleDrawerResponsive(width);
  }, [width]);

  const MENU_DATA = [
    {
      label: 'Home',
      icon: <DesktopMac />,
      link: '/admin'
    },
    {
      label: 'Moderator',
      icon: <GraphicEq />,
      link: '/admin/moderator'
    },
    {
      label: 'User',
      icon: <SignalCellularAlt />,
      link: '/admin/user'
    },
    {
      label: 'Book',
      icon: <Group />,
      link: '/admin/book'
    },
    {
      label: 'Category',
      icon: <Group />,
      link: '/admin/category'
    },
    {
      label: 'Setting',
      icon: <Person />,
      link: '/admin/setting'
    }
  ];

  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        {open && (
          <img
            className={classes.logo}
            alt=""
            src="/static/images/bookstore.png"
          />
        )}
        {!open ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        )}
      </div>
      <Divider />
      <List id="scrollbar">
        {MENU_DATA.map((menu, index) => (
          <Link key={index} href={menu.link || '/'}>
            <ListItem
              className={
                router.pathname === menu.link ? classes.menuActive : ''
              }
              button
            >
              <ListItemIcon
                className={
                  router.pathname === menu.link ? classes.menuActive : ''
                }
              >
                {menu.icon}
              </ListItemIcon>
              {menu.label}
            </ListItem>
          </Link>
        ))}
      </List>
      <style jsx global>
        {`
          #scrollbar {
            overflow-x: hidden;
          }
          #scrollbar:hover {
            overflow-y: auto;
          }
          #scrollbar::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: #f5f5f5;
          }

          #scrollbar::-webkit-scrollbar {
            width: 4px;
            background-color: #f5f5f5;
          }

          #scrollbar::-webkit-scrollbar-thumb {
            background-color: #949494;
          }
        `}
      </style>
    </Drawer>
  );
};
export default enhance(VerticalBarComponent);

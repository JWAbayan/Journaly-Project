import { useState, useEffect } from 'react';
import './styles/Dashboard.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { CollectionsBookmark, Event } from '@mui/icons-material';
import { Link, Outlet, Navigate } from 'react-router-dom'


import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  FormControl,
  TextField,
  Button
}
  from '@mui/material';

import EditModal from './pages/planners/TaskPlanner'
import axios from 'axios';




export default function Dashboard({ authorized, currentUser, handleLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [anchorNotif, setAnchorNotif] = useState(null);
  const [anchorProfile, setAnchorProfile] = useState(null);
  const [primaryMenuOpen, setPrimaryMenuOpen] = useState(false);

  const isProfileOpen = Boolean(anchorProfile);
  const isAccountMenuOpen = Boolean(anchorEl);
  const isMobileAccountMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationOpen = Boolean(anchorNotif)
  const isPrimaryMenuOpen = primaryMenuOpen;

  //Storage for fetched notifications
  const notifications = [];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handlePrimaryMenuOpen = (toggle) => {
    setPrimaryMenuOpen(toggle)
  }

  const handleProfileOpen = (event) => {
    setAnchorProfile(event.target);
  }

  const handleProfileClose = () => {
    setAnchorProfile(null)
  }

  const handleNotifOpen = (event) => {
    setAnchorNotif(event.target);
  }

  const handleNotifClose = () => {
    setAnchorNotif(null)
  }

  const accountMenuId = 'account-menu';
  const renderAccountMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={accountMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isAccountMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileAccountMenu = 'primary-search-account-menu-mobile';

  const renderMobileAcountMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileAccountMenu}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileAccountMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 10 new notifications"
          color="inherit"

        >
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const NotifTab = () => {
    return (
      <Popover
        open={isNotificationOpen}
        onClose={handleNotifClose}
        anchorEl={anchorNotif}
      >
        <Box display='flex' p={3} justifyContent='center' sx={{ height: '500px', width: '300px' }}>
          <Typography variant='h6'>Notifications</Typography>
          <Box className='notifications' display="inherit" height="100%" sx={{}}>

          </Box>
        </Box>
      </Popover>
    );
  }

  function ProfileTab(props) {

    const [userField, setUserField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passField, setPassField] = useState('');
    const [inEditMode, setInEditMode] = useState(false);
    const [existing, setExisting] = useState(false);
    const [user, setUser] = useState(null);
    var currUser = props.currentUser;

    useEffect(() => {
      fetchUser();
    }, [])

    const fetchUser = () => {
      if (currUser) {
        console.log(currUser);
        axios.get(`http://localhost:8000/api/allusers/${currUser.id}/`)
          .then((result) => setUser(result.data))
      }
    }

    const handleUsnChange = (event) => {
      setUserField(event.target.value);
    }


    const handleEmailChange = (event) => {
      setEmailField(event.target.value);
    }

    const handlePassChange = (event) => {
      setPassField(event.target.value);
    }

    const switchToEdit = () => {
      setInEditMode(true);
    }

    const handleSave = () => {
      checkIfExisting();

      if (existing) {
        alert('Email is already registered');
        return;
      }

      let username = userField;
      let email = emailField;
      let password = passField;

      if (username == '') {
        username = currUser.username;
      }

      if (email == '') {
        email = currUser.email;
      }

      if (password == '') {
        password = currUser.password;
      }

      let updatedUser = { username: username, email: email, password: password };
      alert('Account Updated');
      axios.put(`http://localhost:8000/api/allusers/${user.id}/`, updatedUser)
        .then(() => { setInEditMode(false) })
        .catch((error) => console.log(error.response))
    }

    const checkIfExisting = () => {
      axios.get(`http://localhost:8000/api/validate?email=${emailField}`)
        .then((results) => {
          if (results.data.length > 0) {
            setExisting(true);
          }
        });
    }

    if (user) {
      return (
        <Popover
          open={isProfileOpen}
          onClose={handleProfileClose}
          anchorEl={anchorProfile}
        >
          <Box display='flex' flexDirection='column' p={3} alignItems='center' sx={{ height: '500px', width: '300px' }}>
            <Typography variant='h6'>Profile</Typography>
            <FormControl>
              <Box sx={{ marginTop: 2 }}>
                <TextField label='Username' variant='filled' disabled={!inEditMode} onChange={handleUsnChange} type='text' defaultValue={user.username} />
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <TextField label='Email' variant='filled' disabled={!inEditMode} onChange={handleEmailChange} type='email' defaultValue={user.email} />
              </Box>
              <Box sx={{ marginTop: 2 }}>
                <TextField label='Password' variant='filled' disabled={!inEditMode} onChange={handlePassChange} type='password' defaultValue={user.password} />
              </Box>
              <Box display='flex' sx={{ marginTop: 2 }}>
                <Button sx={{ marginRight: 'auto', width: 100 }} variant='contained' onClick={switchToEdit} disabled={inEditMode}>Edit</Button>
                <Button sx={{ marginLeft: 'auto', width: 100 }} variant='contained' onClick={handleSave} disabled={!inEditMode}>Save</Button>
              </Box>

              <Button sx={{ marginTop: 2, justifyContent: 'center' }} variant='outlined' onClick={handleLogout}>Signout</Button>
            </FormControl>
          </Box >
        </Popover >
      );
    }

    return null;
  }

  const renderPrimaryMenu = () => {

    return (
      <>
        <List>
          <Link to='/dashboard/planner'>
            <ListItemButton>
              <ListItemIcon>
                <CollectionsBookmark color="primary" />
              </ListItemIcon>
              <ListItemText primary="Journals" />
            </ListItemButton>
          </Link>


          <Link to='/dashboard/calendar'>
            <ListItemButton>
              <ListItemIcon>
                <Event color="primary" />
              </ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItemButton>
          </Link>
        </List>
      </>
    );

  }

  TODO:
  //remove true 
  //ProfileTab component must have the retrieved user

  //If user is authorized, render dashboard
  if (authorized) {
    return (
      <Box sx={{ flexGrow: 1, height: '100%' }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={() => handlePrimaryMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor={'left'}
              open={isPrimaryMenuOpen}
              onClose={() => handlePrimaryMenuOpen(false)}
            >
              {renderPrimaryMenu()}
            </Drawer>


            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              JOURNALY
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleNotifOpen}
              >
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={accountMenuId}
                aria-haspopup="true"
                sx={{ color: 'white' }}
                onClick={handleProfileOpen}
              >
                <AccountCircle />
              </IconButton>


            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileAccountMenu}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileAcountMenu}
        {renderAccountMenu}
        <NotifTab />
        <ProfileTab currentUser={currentUser} />
        <Outlet />
      </Box>
    );
  }

  //Redirect to login page if user is not authorized
  else {
    return (<Navigate to='/' />);
  }
}

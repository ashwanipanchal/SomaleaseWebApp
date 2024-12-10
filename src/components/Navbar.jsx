import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import { styled } from '@mui/system';
import { FaBars, FaHome, FaBuilding, FaUser } from 'react-icons/fa';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#ffffff',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

const Logo = styled('img')({
  height: '40px',
  marginRight: '16px',
});

const NavButton = styled(Button)(({ theme }) => ({
  color: '#333333',
  marginRight: '16px',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

const PostPropertyButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3498db',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#2980b9',
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Logo src="https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" alt="Logo" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#333333' }}>
          Real Estate
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <NavButton startIcon={<FaHome />}>Home</NavButton>
          <NavButton startIcon={<FaBuilding />}>Properties</NavButton>
          <NavButton startIcon={<FaUser />}>My Account</NavButton>
          <PostPropertyButton variant="contained">Post Property</PostPropertyButton>
        </Box>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { xs: 'flex', md: 'none' }, color: '#333333' }}
          onClick={handleMenu}
        >
          <FaBars />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <FaHome style={{ marginRight: '8px' }} /> Home
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <FaBuilding style={{ marginRight: '8px' }} /> Properties
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <FaUser style={{ marginRight: '8px' }} /> My Account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <PostPropertyButton variant="contained" fullWidth>Post Property</PostPropertyButton>
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
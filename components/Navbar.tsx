import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Logo from 'components/Logo';

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Logo />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

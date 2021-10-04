import React from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/system';

import GoogleIcon from '@mui/icons-material/Google';

import Logo from 'components/Logo';
import { Avatar, IconButton } from '@mui/material';

import { useJsDocsAuth } from 'contexts/AuthContext';

const Navbar: React.FC = () => {
  const { currentUser, signIn } = useJsDocsAuth();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Logo />
        <Box flexGrow={1} />
        {currentUser ? (
          <Avatar
            alt={currentUser.displayName || ''}
            src={currentUser.photoURL || ''}
            sx={{ width: 24, height: 24, cursor: 'pointer' }}
          />
        ) : (
          <IconButton onClick={signIn}>
            <GoogleIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

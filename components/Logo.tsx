/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

import React from 'react';
import styled from 'styled-components';

import Typography from '@mui/material/Typography';

const StyledSub = styled.sub`
  font-size: 0.75rem;
`;

const Logo: React.FC = () => {
  return (
    <Typography variant="h6" color="inherit" component="div">
      JS Docs <StyledSub>by Vighnesh</StyledSub>
    </Typography>
  );
};

export default Logo;

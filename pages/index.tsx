import React, { useEffect } from 'react';
import styled from 'styled-components';

import Resizable from 'components/Resizable';
import Explorer from 'components/Explorer';

const StyledMain = styled.main`
  display: flex;
  flex-direction: row;

  .viewer {
    flex-grow: 1;
    border: 1px solid yellow;
  }
`;

const HomePage = () => {
  return (
    <StyledMain>
      <Resizable direction={'horizontal'} initialWidthMultiplier={0.25}>
        <Explorer />
      </Resizable>
      <div className="viewer">Hello</div>
    </StyledMain>
  );
};

export default HomePage;

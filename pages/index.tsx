import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Resizable from 'components/Resizable';
import Explorer from 'components/Explorer';
import View from 'components/View';

const StyledMain = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;

  .viewer {
    flex: 1;
    min-width: 0;
  }
`;

const HomePage = () => {
  const activeFileId = '123';
  const [saveRequired, setSaveRequired] = useState<{ [fileId: string]: boolean }>({});

  const onTabClose = (fileId: string) => {};

  return (
    <StyledMain>
      <Resizable direction={'horizontal'} initialWidthMultiplier={0.25}>
        <Explorer />
      </Resizable>
      <div className="viewer">
        <View />
      </div>
    </StyledMain>
  );
};

export default HomePage;

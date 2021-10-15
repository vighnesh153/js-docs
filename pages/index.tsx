import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import Resizable from 'components/Resizable';
import Explorer from 'components/Explorer';
import View from 'components/View';

import ExplorerItem from 'models/ExplorerItem';

import GlobalsContext from 'contexts/GlobalsContext';

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
  const globalsContext = useContext(GlobalsContext);

  const activeFileId = '123';
  const [saveRequired, setSaveRequired] = useState<{ [fileId: string]: boolean }>({});

  const onTabClose = (fileId: string) => {};

  useEffect(() => {
    globalsContext.setExplorerItems(items);
  }, []);

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

const items: ExplorerItem[] = [
  {
    id: 'dir-001',
    name: 'Dir 1',
    type: 'directory',
    parentIds: [],
  },
  {
    id: 'dir-002',
    name: 'Dir 2',
    type: 'directory',
    parentIds: [],
  },
  {
    id: 'dir-004',
    name: 'Dir 4',
    type: 'directory',
    parentIds: ['dir-002'],
  },
  {
    id: 'file-004',
    name: 'File 4',
    type: 'file',
    parentIds: ['dir-002', 'dir-004'],
  },
  {
    id: 'file-001',
    name: 'File 1',
    type: 'file',
    parentIds: ['dir-001'],
  },
  {
    id: 'file-002',
    name: 'File 2',
    type: 'file',
    parentIds: ['dir-002'],
  },
  {
    id: 'file-003',
    name: 'File 3',
    type: 'file',
    parentIds: ['dir-003'],
  },
  {
    id: 'dir-003',
    name: 'Dir 3',
    type: 'directory',
    parentIds: [],
  },
];

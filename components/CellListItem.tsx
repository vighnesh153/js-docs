import React, { useContext } from 'react';
import dynamic from 'next/dynamic';

import { Box } from '@mui/system';

import Cell from 'models/Cell';

import JsDocsAuthContext from 'contexts/AuthContext';

import CellListItemActionsBar from 'components/CellListItemActionsBar';
import CodeCell from 'components/CodeCell';

const TextCell = dynamic(() => import('components/TextCell'), { ssr: false });

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  const { isAdmin } = useContext(JsDocsAuthContext);

  let child: JSX.Element;
  if (cell.type === 'code') {
    child = (
      <React.Fragment>
        {isAdmin && (
          <Box
            className="action-bar-wrapper"
            sx={{
              height: 30,
              width: '100%',
              backgroundColor: 'hsl(210, 15%, 25%)',
            }}
          >
            <CellListItemActionsBar id={cell.id} />
          </Box>
        )}
        <CodeCell cell={cell} />
      </React.Fragment>
    );
  } else {
    child = (
      <React.Fragment>
        <TextCell cell={cell} />
        {isAdmin && <CellListItemActionsBar id={cell.id} />}
      </React.Fragment>
    );
  }

  return (
    <Box
      className="cell-list-item"
      sx={{
        position: 'relative',
      }}
    >
      {child}
    </Box>
  );
};

export default CellListItem;

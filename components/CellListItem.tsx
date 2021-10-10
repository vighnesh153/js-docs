import React from 'react';
import dynamic from 'next/dynamic';

import ActionsBar from 'components/ActionsBar';
import CodeCell from 'components/CodeCell';

const TextCell = dynamic(() => import('components/TextCell'), { ssr: false });

import Cell from 'models/Cell';
import { Box } from '@mui/system';

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: React.FC<CellListItemProps> = ({ cell }) => {
  let child: JSX.Element;
  if (cell.type === 'code') {
    child = (
      <React.Fragment>
        <Box
          className="action-bar-wrapper"
          sx={{
            height: 30,
            width: '100%',
            backgroundColor: 'hsl(210, 15%, 25%)',
          }}
        >
          <ActionsBar id={cell.id} />
        </Box>
        <CodeCell cell={cell} />
      </React.Fragment>
    );
  } else {
    child = (
      <React.Fragment>
        <TextCell cell={cell} />
        <ActionsBar id={cell.id} />
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

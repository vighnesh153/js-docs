import React from 'react';

import ActionsBar from 'components/ActionsBar';
import CodeCell from 'components/CodeCell';
// import TextEditor from 'components/TextCell';

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
        {/*<TextEditor cell={cell} />*/}
        <h2>Text editor goes here. Not yet able to find a good markdown editor that works fine with NextJS :(</h2>
        <h3>
          Editors that I like but don't work with NextJS due to css file import from node_modules bug:
          @uiw/react-md-editor, ReMirror
        </h3>
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

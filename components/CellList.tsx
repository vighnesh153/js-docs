import React, { useContext, useMemo } from 'react';

import { Box } from '@mui/system';

import CellListItem from 'components/CellListItem';
import AddCell from 'components/AddCell';

import FileContext from 'store/contexts/FileContext';
import JsDocsAuthContext from 'contexts/AuthContext';

const CellList: React.FC = () => {
  const fileContext = useContext(FileContext);
  const { isAdmin } = useContext(JsDocsAuthContext);

  const cells = useMemo(() => {
    const { order, data } = fileContext.cells;
    return order.map((id) => data[id]);
  }, [fileContext.cells]);

  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      {isAdmin && <AddCell previousCellId={cell.id} />}
    </React.Fragment>
  ));

  return (
    <Box
      // The following classname is being used in globals.scss
      className="cell-list"
      margin={'0 25px 50vh'}
    >
      {isAdmin && <AddCell forceVisible={cells.length === 0} previousCellId={null} />}
      {renderedCells}
    </Box>
  );
};

export default CellList;

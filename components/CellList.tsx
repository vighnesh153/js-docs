import React, { useContext, useEffect, useMemo } from 'react';

import { Box } from '@mui/system';

import CellListItem from 'components/CellListItem';
import AddCell from 'components/AddCell';

import FileContext from 'store/contexts/FileContext';

const CellList: React.FC = () => {
  const fileContext = useContext(FileContext);

  const cells = useMemo(() => {
    const { order, data } = fileContext.cells;
    return order.map((id) => data[id]);
  }, [fileContext.cells]);

  useEffect(() => {
    // fetchCells();
  }, []);

  const renderedCells = cells.map((cell) => (
    <React.Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </React.Fragment>
  ));

  return (
    <Box
      // The following classname is being used in globals.scss
      className="cell-list"
      margin={'0 25px 50vh'}
    >
      <AddCell forceVisible={cells.length === 0} previousCellId={null} />
      {renderedCells}
    </Box>
  );
};

export default CellList;

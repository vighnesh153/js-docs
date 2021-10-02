import React, { useCallback, useContext, useMemo, useReducer } from 'react';
import {
  bundlesReducer,
  cellsReducer,
  bundlesInitialState,
  cellsInitialState,
  CellsState,
  BundlesState,
} from 'store/reducers';
import Actions, { Direction } from 'store/actions';

import {
  createBundle,
  initializeCells,
  moveCell,
  deleteCell,
  insertCellAfter,
  updateCell,
} from 'store/action-creators';
import { CellType, ICell } from 'models/Cell';

interface FileContext {
  bundles: BundlesState;
  cells: CellsState;
  dispatch: (action: Actions) => void;
}

const FileContext = React.createContext<FileContext>({
  bundles: bundlesInitialState,
  cells: cellsInitialState,
  dispatch: () => null,
});

/**
 * Should only be used inside file context provider component's sub-tree
 */
export const useFileContextActions = () => {
  const { dispatch } = useContext(FileContext);

  return useMemo(
    () => ({
      createBundle: (cellId: string, input: string) => createBundle(cellId, input)(dispatch),
      initializeCells: (cells: ICell[]) => dispatch(initializeCells(cells)),
      deleteCell: (id: string) => dispatch(deleteCell(id)),
      moveCell: (id: string, direction: Direction) => dispatch(moveCell(id, direction)),
      updateCell: (id: string, content: string) => dispatch(updateCell(id, content)),
      insertCellAfter: (id: string | null, cellType: CellType) => dispatch(insertCellAfter(id, cellType)),
    }),
    [dispatch]
  );
};

export const FileContextProvider: React.FC = (props) => {
  const [bundles, dispatchBundles] = useReducer(bundlesReducer, bundlesInitialState);
  const [cells, dispatchCells] = useReducer(cellsReducer, cellsInitialState);

  const dispatch = useCallback(
    (action: Actions) => {
      dispatchBundles(action);
      dispatchCells(action);
    },
    [dispatchBundles, dispatchCells]
  );

  const memoizedValue = useMemo<FileContext>(
    () => ({
      bundles,
      cells,
      dispatch,
    }),
    [bundles, cells, dispatch]
  );

  return <FileContext.Provider value={memoizedValue}>{props.children}</FileContext.Provider>;
};

export default FileContext;

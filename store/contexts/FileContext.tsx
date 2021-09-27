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

import * as actionCreators from 'store/action-creators';
import { CellType } from 'models/Cell';

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

export const useFileContextActions = () => {
  const { dispatch } = useContext(FileContext);

  return {
    createBundle: (cellId: string, input: string) =>
      actionCreators.createBundle(cellId, input)(dispatch),
    deleteCell: (id: string) => dispatch(actionCreators.deleteCell(id)),
    moveCell: (id: string, direction: Direction) =>
      dispatch(actionCreators.moveCell(id, direction)),
    updateCell: (id: string, content: string) =>
      dispatch(actionCreators.updateCell(id, content)),
    insertCellAfter: (id: string | null, cellType: CellType) =>
      dispatch(actionCreators.insertCellAfter(id, cellType)),
  };
};

export const FileContextProvider: React.FC = (props) => {
  const [bundles, dispatchBundles] = useReducer(
    bundlesReducer,
    bundlesInitialState
  );
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

  return (
    <FileContext.Provider value={memoizedValue}>
      {props.children}
    </FileContext.Provider>
  );
};

export default FileContext;

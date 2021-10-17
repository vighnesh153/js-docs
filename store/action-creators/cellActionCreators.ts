import { CellType, ICell } from 'models/Cell';
import {
  DeleteCellAction,
  Direction,
  FileSavedSuccessfully,
  InitializeCellsAction,
  InsertCellAfterAction,
  MoveCellAction,
  UpdateCellAction,
} from 'store/actions';
import ActionType from 'store/action-types';

export const initializeCells = (cells: ICell[]): InitializeCellsAction => {
  return {
    type: ActionType.INITIALIZE_CELLS,
    payload: cells,
  };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (id: string | null, cellType: CellType): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};

export const fileSavedSuccessfully = (): FileSavedSuccessfully => {
  return {
    type: ActionType.FILE_SAVED_SUCCESSFULLY,
  };
};

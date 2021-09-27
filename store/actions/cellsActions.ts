import ActionType from 'store/action-types';
import { CellType, ICell } from 'models/Cell';

export interface InitializeCellsAction {
  type: ActionType.INITIALIZE_CELLS;
  payload: ICell[];
}

export type Direction = 'up' | 'down';
export interface MoveCellAction {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCellAction {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellAfterAction {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellType;
  };
}

export interface UpdateCellAction {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export type CellsActions =
  | InitializeCellsAction
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction;

import { Reducer } from 'react';
import { v4 as uuid } from 'uuid';
import produce from 'immer';

import Cell from 'models/Cell';
import Actions from 'store/actions';
import ActionType from 'store/action-types';

export interface CellsState {
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

export const cellsInitialState: CellsState = {
  order: [],
  data: {},
};

const cellsReducerFunc: Reducer<CellsState, Actions> = (
  state = cellsInitialState,
  action
) => {
  switch (action.type) {
    case ActionType.INITIALIZE_CELLS:
      state.data = {};

      state.order = action.payload.map((rawCell) => rawCell.id);
      action.payload
        .map(Cell.deserialize)
        .forEach((cell) => (state.data[cell.id] = cell));

      break;
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;

      state.data[id] = state.data[id].clone().setContent(content);

      break;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);

      break;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        break;
      }

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;

      break;
    case ActionType.INSERT_CELL_AFTER:
      const cell: Cell = new Cell(uuid(), action.payload.type, '');

      state.data[cell.id] = cell;

      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id);
      }

      break;
    default:
      break;
  }
  return state;
};

const cellsReducer = produce<CellsState, [action: Actions]>(
  // Need to do this cast to `any` due to some stupid bug. Doesn't happen in BundlesReducer. I hate this.
  cellsReducerFunc as any,
  cellsInitialState
);

export default cellsReducer;

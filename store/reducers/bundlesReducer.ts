import produce from 'immer';
import Actions from 'store/actions';
import ActionType from 'store/action-types';
import { Reducer } from 'react';

export interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        err: string;
      }
    | undefined;
}

export const bundlesInitialState: BundlesState = {};

const bundlesReducerFunc: Reducer<BundlesState, Actions> = (
  state = bundlesInitialState,
  action
) => {
  switch (action.type) {
    case ActionType.BUNDLE_START:
      state[action.payload.cellId] = {
        loading: true,
        code: '',
        err: '',
      };
      break;
    case ActionType.BUNDLE_COMPLETE:
      state[action.payload.cellId] = {
        loading: false,
        code: action.payload.bundle.code,
        err: action.payload.bundle.err,
      };
      break;
    default:
      break;
  }
  return state;
};

const bundlesReducer = produce<BundlesState, [action: Actions]>(
  bundlesReducerFunc,
  bundlesInitialState
);

export default bundlesReducer;

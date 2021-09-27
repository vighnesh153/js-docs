import Actions from 'store/actions';
import ActionType from 'store/action-types';
import bundle from 'bundler';
import { Dispatch } from 'react';

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Actions>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};

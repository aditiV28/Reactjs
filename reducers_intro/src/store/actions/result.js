import * as actionTypes from './actionsTypes';

export const saveResult = (res) => {
  return {
    type: actionTypes.STORE_RESULT,
    result: res
  }
}

export const storeResult = (res) => {
  return function(dispatch, getState){  //dispath comes from thunk which hels to get async
    setTimeout(() => {
      const oldCounter = getState().ctr.counter;
      console.log(oldCounter);
      dispatch(saveResult(res))
    }, 2000);
  }
};

export const deleteResult = (resID) => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultID: resID
  }
};

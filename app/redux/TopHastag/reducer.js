import { initialState } from './state';
import * as ActionTypes from './constants';

export default TopHastagReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TOP_HASTAG: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_TOP_HASTAG_SUCCESS: {
      return {
        ...state,
        top: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_TOP_HASTAG_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default: return { ...state }
  }
}

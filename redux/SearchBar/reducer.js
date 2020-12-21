import { initialState } from './state';
import * as ActionTypes from './constants'

export default SearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.SEARCH_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.SEARCH_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.SEARCH_RESET: {
      return {
        ...state,
        list: []
      }
    }
    default: return { ...state }
  }
}

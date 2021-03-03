import { initialState } from './state';
import * as ActionTypes from './constants';

export default TubeMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TUBE_MENU: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_TUBE_MENU_SUCCESS: {
      return {
        ...state,
        trending: action.payload.trend,
        following: action.payload.following,
        suggestions: action.payload.suggest,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_TUBE_MENU_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.ADD_TUBE_IN_CACHE: {
      return {
        ...state,
        downloaded: state.downloaded.concat([action.payload])
      }
    }
    case ActionTypes.RESET_TUBE_MENU: return initialState
    default: return { ...state }
  }
}

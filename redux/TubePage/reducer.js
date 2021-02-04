import { initialState } from './state';
import * as ActionTypes from './constants';

export default TubePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_TUBE_PAGE: {
      return {
        ...state,
        tube: null,
        tubesFollower: [],
        tubesSuggestions: [],
        isLoading: true
      }
    }
    case ActionTypes.GET_TUBE_PAGE_SUCCESS: {
      return {
        ...state,
        tube: action.payload.tube,
        tubesFollower: action.payload.Follower,
        tubesSuggestions: action.payload.relatedVideo,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_TUBE_PAGE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.LIKE_TUBE_PAGE: {
      return { ...state }
    }
    case ActionTypes.LIKE_TUBE_PAGE_SUCCESS: {
      return { ...state }
    }
    case ActionTypes.RESET_TUBE_PAGE: return initialState
    default: return state
  }
}

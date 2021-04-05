import { initialState } from './state';
import * as ActionTypes from './constants'

export default MyStoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MY_STORY: {
      return {
        ...state,
        stories: [],
        isLoading: true
      }
    }
    case ActionTypes.GET_MY_STORY_SUCCESS: {
      return {
        ...state,
        stories: action.payload.reverse(),
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_MY_STORY_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.DELETE_STORY_BY_ID: {
      return {
        ...state,
        deleteIsLoading: true,
      }
    }
    case ActionTypes.DELETE_STORY_BY_ID_SUCCESS: {
      return {
        ...state,
        stories: state.stories.filter(x => x.publication._id !== action.id),
        deleteIsLoading: false,
        error: null,
      }
    }
    case ActionTypes.DELETE_STORY_BY_ID_FAIL: {
      return {
        ...state,
        deleteIsLoading: false,
        error: action.payload
      }
    }
    default: return { ...state }
  }
}

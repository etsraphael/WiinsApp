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
      state.tube.isLiked = true
      state.tube.totalLike += 1
      return { ...state }
    }
    case ActionTypes.DISLIKE_TUBE_PAGE: {
      state.tube.isLiked = false
      state.tube.totalLike -= 1
      return { ...state }
    }
    case ActionTypes.LIKE_TUBE_PAGE_FAIL: {
      state.tube.isLiked = false
      state.tube.totalLike -= 1
      return { ...state }
    }
    case ActionTypes.DISLIKE_TUBE_PAGE_FAIL: {
      state.tube.isLiked = true
      state.tube.totalLike += 1
      return { ...state }
    }
    case ActionTypes.FOLLOW_IN_TUBE_PAGE: {
      state.tube.relation = 'following'
      return { ...state }
    }
    case ActionTypes.FOLLOW_IN_TUBE_PAGE_FAIL: {
      state.tube.relation = 'no-relation'
      return { ...state }
    }
    case ActionTypes.DOWNLOAD_TUBE: {
      return {
        progressDownload: 0.1,
        ...state
      }
    }
    case ActionTypes.DOWNLOAD_TUBE_PROGRESS: {
      console.log(action.payload)
      return {
        progressDownload: action.payload,
        ...state
      }
    }
    case ActionTypes.RESET_TUBE_PAGE: return initialState
    default: return state
  }
}

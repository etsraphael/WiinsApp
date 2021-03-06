import { initialState } from './state';
import * as ActionTypes from './constants'

export default PublicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PUBLICATIONS: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.DELETE_PUBLICATION_BY_ID_SUCCESS: {
      return {
        ...state,
        publications: state.publications.filter(x => x._id !== action.id)
      }
    }
    case ActionTypes.GET_PUBLICATIONS_SUCCESS: {
      return {
        ...state,
        publications: state.publications.concat(action.payload),
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.ADD_ONE_PUBLICATIONS_FEED: {
      return {
        ...state,
        publications: [action.payload, ...state.publications]
      }
    }
    case ActionTypes.GET_PUBLICATIONS_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.REFRESH_PUBLICATIONS: {
      return {
        ...state,
        isRefreshing: true
      }
    }
    case ActionTypes.REFRESH_PUBLICATIONS_SUCCESS: {
      return {
        ...state,
        publications: action.payload,
        isRefreshing: false,
        error: null,
      }
    }
    case ActionTypes.REFRESH_PUBLICATIONS_FAIL: {
      return {
        ...state,
        isRefreshing: false,
        error: action.payload
      }
    }
    case ActionTypes.LIKE_PUBLICATIONS_FEED_SUCCESS: {
      const found = state.publications.map(x => x._id).indexOf(action.id)
      state.publications[found].like.isLike = true
      ++state.publications[found].like.likeNumber
      return {
        ...state
      }
    }
    case ActionTypes.UNLIKE_PUBLICATIONS_FEED_SUCCESS: {
      const found = state.publications.map(x => x._id).indexOf(action.id)
      state.publications[found].like.isLike = false
      --state.publications[found].like.likeNumber
      return {
        ...state
      }
    }
    case ActionTypes.UPDATE_COMMENT_PUBLICATIONS_FEED_SUCCESS: {
      const found = state.publications.map(x => x._id).indexOf(action.id)
      ++state.publications[found].commentNumber
      return {
        ...state
      }
    }
    case ActionTypes.ADD_PUBLICATIONS_FEED_SUCCESS: {
      return { ...state }
    }
    case ActionTypes.RESET_PUBLICATIONS: {
      return { ...initialState }
    }
    default: return { ...state }
  }
}

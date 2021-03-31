import { initialState } from './state';
import * as ActionTypes from './constants'

export default PublicationsProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PUBLICATIONS: {
      return {
        ...state,
        isLoading: true
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
    case ActionTypes.GET_PUBLICATIONS_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.LIKE_PUBLICATIONS_PROFILE_SUCCESS: {
      const found = state.publications.map(x => x._id).indexOf(action.id)
      state.publications[found].like.isLike = true
      ++state.publications[found].like.likeNumber
      return {
        ...state
      }
    }
    case ActionTypes.UNLIKE_PUBLICATIONS_PROFILE_SUCCESS: {
      const found = state.publications.map(x => x._id).indexOf(action.id)
      state.publications[found].like.isLike = false
      --state.publications[found].like.likeNumber
      return {
        ...state
      }
    }
    case ActionTypes.UPDATE_COMMENT_PUBLICATIONS_PROFILE_SUCCESS: {
      const found = state.publications.map(x => x._id).indexOf(action.id)
      ++state.publications[found].commentNumber
      return {
        ...state
      }
    }
    case ActionTypes.RESET_PUBLICATIONS: {
      return initialState
    }
    default: return state
  }
}

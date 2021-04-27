import { initialState } from './state';
import * as ActionTypes from './constants'

export default PublicationsInModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_FEED_PUBLICATION_BY_ID_START: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_FEED_PUBLICATION_BY_ID_SUCCESS: {
      return {
        ...state,
        publication: action.payload,
        isLoading: false,
        space: action.space
      }
    }
    case ActionTypes.GET_FEED_PUBLICATION_BY_ID_FAIL: {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    }
    case ActionTypes.PUT_PUBLICATION_IN_MODAL:
      return {
        ...state,
        publication: action.payload,
        space: action.space
      }
    case ActionTypes.COMMENT_ADDED_ON_PUBLICATION_MODAL: {
      state.publication.commentNumber++
      return {
        ...state
      }
    }
    case ActionTypes.RESET_PUBLICATIONS_IN_MODAL: return initialState
    default: return { ...state }
  }
}

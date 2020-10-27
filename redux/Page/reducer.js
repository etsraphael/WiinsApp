import { initialState } from './state';
import * as ActionTypes from './constants';

export default PageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PAGE: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_PAGE_SUCCESS: {
      return {
        ...state,
        page: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_PAGE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.FOLLOW_PAGE_SUCCESS: {
      state.page.followed = true
      ++state.page.followers
      return { ...state }
    }
    case ActionTypes.UNFOLLOW_PAGE_SUCCESS: {
      state.page.followed = false
      --state.page.followers
      return { ...state  }
    }
    default: return state
  }
}

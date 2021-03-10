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
        mainlist: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.COMPLETE_PROFILE_LIST: {
      return {
        ...state,
        profilelist: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.COMPLETE_PAGE_LIST: {
      return {
        ...state,
        pagelist: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.COMPLETE_GROUP_LIST: {
      return {
        ...state,
        grouplist: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.COMPLETE_MUSIC_LIST: {
      return {
        ...state,
        musiclist: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.COMPLETE_MUSIC_PROJECT_LIST: {
      return {
        ...state,
        musicProjectlist: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.COMPLETE_PLAYLIST_LIST: {
      return {
        ...state,
        playlistlist: action.payload,
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
    case ActionTypes.COMPLETE_TAG_LIST: {
      return {
        ...state,
        isLoading: false,
        tag: action.payload
      }
    }
    case ActionTypes.SEARCH_RESET: {
      return initialState
    }
    default: return { ...state }
  }
}

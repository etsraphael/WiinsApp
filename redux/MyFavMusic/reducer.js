import { initialState } from './state';
import { setCacheStatus, canRequestCacheForUrl } from './../../app/services/cache/cache-service'
import * as ActionTypes from './constants';

export default MyFavMusicReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MY_FAV_MUSIC: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_MY_FAV_MUSIC_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_MY_FAV_MUSIC_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.REMOVE_FILE_IN_CACHE: {
      return setCacheStatus(action.key, undefined, state)
    }
    case ActionTypes.FILE_CACHE_REQUESTED: {
      if (!canRequestCacheForUrl(action.key, state.musicsCache)) {
        return state;
      }
      return setCacheStatus(action.key, { type: "FileCacheRequested" }, state)
    }
    case ActionTypes.FILE_CACHE_SUCCEEDED: {
      return setCacheStatus(action.key, { type: "FileCacheSucceeded", localUrl: action.localUrl, }, state)
    }
    case ActionTypes.FILE_CACHE_FAILED: {
      return setCacheStatus(action.key, { type: "FileCacheFailed" }, state)
    }
    default: return { ...state }
  }
}

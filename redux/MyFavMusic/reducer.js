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
    case ActionTypes.FILE_CACHE_IN_PROGRESS: {
      const musicsCache = state.musicsCache.push({
        name: action.name,
        path: action.path,
        updatedAt: new Date.now(),
        views: 1,
        ready: false
      })
      return {
        ...state,
        musicsCache
      }
    }
    case ActionTypes.REMOVE_ALL_FILE_IN_CACHE: {
      return {
        ...state,
        musicsCache: []
      }
    }
    case ActionTypes.REMOVE_FILE_IN_CACHE: {
      const musicsCacheFound = state.musicsCache.map(x => x.url).indexOf(action.url)
      state.musicsCache(musicsCacheFound)
      return { ...state }
    }





    case ActionTypes.FILE_CACHE_SUCCEEDED: {

      const musicsCacheFound = state.musicsCache.map(x => x.url).indexOf(action.url)
      state.musicsCache[musicsCacheFound].ready = true

      return {
        ...state 
      }
    }




    // case ActionTypes.FILE_CACHE_FAILED: {
    //   return setCacheStatus(action.key, { type: "FileCacheFailed" }, state)
    // }





    default: return { ...state }
  }
}

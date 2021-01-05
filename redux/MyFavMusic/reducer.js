import { initialState } from './state'
import * as ActionTypes from './constants'
import RNFetchBlob from 'rn-fetch-blob'


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
      return { ...state }
    }
    case ActionTypes.REMOVE_FILE_IN_CACHE: {
      const musicsCacheFound = state.musicsCache.map(x => x.url).indexOf(action.url)
      state.musicsCache.remove(musicsCacheFound)
      return { ...state }
    }
    case ActionTypes.FILE_CACHE_SUCCEEDED: {
      const musicsCacheFound = state.musicsCache.map(x => x.url).indexOf(action.url)
      state.musicsCache[musicsCacheFound].state = 'confirmed'
      return {
        ...state 
      }
    }
    case ActionTypes.FILE_CACHE_FAILED: {
      const musicsCacheFound = state.musicsCache.map(x => x.url).indexOf(action.url)
      state.musicsCache[musicsCacheFound].state = 'failed'
      return {
        ...state 
      }
    }
    case ActionTypes.REMOVE_ALL_FILE_IN_CACHE: {
      // clean the cache for the music
      for(let music of state.musicsCache){
        RNFetchBlob.fs.unlink(music.path)
      }
      return {
        ...state,
        musicsCache: []
      }
    }
    default: return { ...state }
  }
}

import { initialState } from './state';
import * as ActionTypes from './constants';

export default PlaylistPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MUSIC_PLAYLIST: {
      return {
        ...state,
        isLoading: true,
        playlist: null
      }
    }
    case ActionTypes.GET_MUSIC_PLAYLIST_SUCCESS: {
      return {
        ...state,
        playlist: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_MUSIC_PLAYLIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.SET_MUSIC_PLAYLIST_IN_CACHE_SUCCESS: {
      const musicFound = state.playlist.musicList.map(x => x.file).indexOf(action.url)
      if (musicFound !== -1) {
        state.playlist.musicList[musicFound].inCache = 'confirmed'
        return {
          ...state
        }
      } else return { ...state }
    }
    case ActionTypes.SET_MUSIC_PLAYLIST_IN_CACHE: {
      const musicFound = state.playlist.musicList.map(x => x.file).indexOf(action.url)
      if (musicFound !== -1) {
        state.playlist.musicList[musicFound].inCache = 'progress'
        return {
          ...state
        }
      } else return { ...state }
    }
    case ActionTypes.SET_MUSIC_PLAYLIST_IN_CACHE_FAIL: {
      const musicFound = state.playlist.musicList.map(x => x.file).indexOf(action.url)
      if (musicFound !== -1) {
        state.playlist.musicList[musicFound].inCache = 'not'
        return {
          ...state
        }
      } else return { ...state }


    }
    case ActionTypes.START_OF_UPLOAD_PLAYLIST: {
      return {
        ...state,
        uploading: true
      }
    }
    case ActionTypes.END_OF_UPLOAD_PLAYLIST: {
      return {
        ...state,
        uploading: false
      }
    }
    case ActionTypes.LIKE_MUSIC_SUCCESS: {
      const newMusicList = state.playlist.musicList.map(x =>
        x._id === action.id ? { ...x, isLiked: true } : x
      )
      return {
        ...state,
        playlist: {
          ...state.playlist,
          musicList: newMusicList
        }
      }
    }
    case ActionTypes.DISLIKE_MUSIC_SUCCESS: {
      const newMusicList = state.playlist.musicList.map(x =>
        x._id === action.id ? { ...x, isLiked: false } : x
      )
      return {
        ...state,
        playlist: {
          ...state.playlist,
          musicList: newMusicList
        }
      }
    }
    case ActionTypes.RESET_MUSIC_PLAYLIST: return initialState
    default: return state
  }
}

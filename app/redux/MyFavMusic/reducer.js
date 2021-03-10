import { initialState } from './state'
import * as ActionTypes from './constants'

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
    case ActionTypes.SET_MUSIC_FAV_IN_CACHE: {
      const musicFound = state.list.map(x => x.file).indexOf(action.url)
      if (musicFound !== -1) {
        state.list[musicFound].inCache = 'progress'
        return {
          ...state
        }
      } else return { ...state }
    }
    case ActionTypes.SET_MUSIC_FAV_IN_CACHE_SUCCESS: {
      const musicFound = state.list.map(x => x.file).indexOf(action.url)
      if (musicFound !== -1) {
        state.list[musicFound].inCache = 'confirmed'
        return {
          ...state
        }
      } else return { ...state }
    }
    case ActionTypes.SET_MUSIC_FAV_IN_CACHE_FAIL: {
      const musicFound = state.list.map(x => x.file).indexOf(action.url)
      if (musicFound !== -1) {
        state.list[musicFound].inCache = 'not'
        return {
          ...state
        }
      } else return { ...state }
    }
    case ActionTypes.START_OF_UPLOAD: {
      return {
        ...state,
        uploading: true
      }
    }
    case ActionTypes.END_OF_UPLOAD: {
      return {
        ...state,
        uploading: false
      }
    }
    case ActionTypes.ADD_MUSIC_AFTER_LIKED: {
      state.list.push(action.music)
      return {
        ...state
      }
    }
    case ActionTypes.PULL_MUSIC_AFTER_DISLIKED: {
      return {
        ...state,
        list: state.list.filter(music => music._id !== action.id)
      }
    }
    default: return { ...state }
  }
}

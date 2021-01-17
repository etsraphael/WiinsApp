import { initialState } from './state';
import * as ActionTypes from './constants';

export default PlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.PLAY_MUSIC: {
      return {
        ...state,
        musicIsPlaying: action.music,
        trackList: action.trackList,
        isPlayling: true,
        displayMiniPlayer: true
      }
    }
    case ActionTypes.PAUSE_MUSIC: {
      return {
        ...state,
        isPlayling: false
      }
    }
    case ActionTypes.CONTINUE_MUSIC: {
      return {
        ...state,
        isPlayling: true
      }
    }
    case ActionTypes.NEXT_MUSIC: {
      const nextMusic = state.trackList.indexOf(state.musicIsPlaying) + 1
      return {
        ...state,
        musicIsPlaying: state.trackList[nextMusic]
      }
    }
    case ActionTypes.PREV_MUSIC: {
      const prevMusic = state.trackList.indexOf(state.musicIsPlaying) - 1
      return {
        ...state,
        musicIsPlaying: state.trackList[prevMusic]
      }
    }
    case ActionTypes.RESET_PLAYER:
    case ActionTypes.STOP_PLAYER: {
      return initialState
    }
    case ActionTypes.PROGRESS_UPDATE: {
      return {
        ...state,
        timer: action.payload
      }
    }
    case ActionTypes.LIKE_MUSIC_FROM_PLAYER_SUCCESS: {
      state.musicIsPlaying.isLiked = true
      return { ...state }
    }
    case ActionTypes.DISLIKE_MUSIC_FROM_PLAYER_SUCCESS: {
      state.musicIsPlaying.isLiked = false
      return { ...state }
    }
    case ActionTypes.FOLLOW_ARTIST_SUCCESS: {
      return { 
        ...state,
        musicIsPlaying: {
          ...state.musicIsPlaying,
          music: {
            ...state.musicIsPlaying.music,
            profile : {
              ...state.musicIsPlaying.music.profile,
              relation: 'following'
            }
          }
        }
      }
    }
    default: return { ...state }
  }
}

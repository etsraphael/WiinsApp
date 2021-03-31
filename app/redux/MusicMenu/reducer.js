import { initialState } from './state';
import * as ActionTypes from './constants';

export default MusicMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MUSIC_MENU: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_MUSIC_MENU_SUCCESS: {
      return {
        ...state,
        menu: {
          ...action.payload,
          stylesSuggestion: {
            ...state.menu.stylesSuggestion,
            rap: action.rap
          }
        },
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_MUSIC_MENU_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.REFRESH_MUSIC_MENU: {
      return {
        ...state,
        isRefreshing: true
      }
    }
    case ActionTypes.REFRESH_MUSIC_MENU_SUCCESS: {
      return {
        ...state,
        menu: {
          ...action.payload,
          stylesSuggestion: {
            ...state.menu.stylesSuggestion,
            rap: action.rap
          }
        },
        isRefreshing: false,
        error: null,
      }
    }
    case ActionTypes.REFRESH_MUSIC_MENU_FAIL: {
      return {
        ...state,
        isRefreshing: false,
        error: action.payload
      }
    }
    default: return { ...state }
  }
}

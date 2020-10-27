import { initialState } from './state';
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
    default: return state
  }
}

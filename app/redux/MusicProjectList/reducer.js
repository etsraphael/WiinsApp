import { initialState } from './state';
import { GET_LIST_PUBLICATIONS_MUSIC, GET_LIST_PUBLICATIONS_MUSIC_SUCCESS, GET_LIST_PUBLICATIONS_MUSIC_FAIL, RESET_PUBLICATIONS_MUSIC} from './constants';

export default MusicProjectListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_PUBLICATIONS_MUSIC: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_LIST_PUBLICATIONS_MUSIC_SUCCESS: {
      return {
        ...state,
        musicProjects: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case GET_LIST_PUBLICATIONS_MUSIC_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case RESET_PUBLICATIONS_MUSIC: return initialState
    default: return state
  }
}

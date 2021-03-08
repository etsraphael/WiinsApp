import { initialState } from './state';
import { GET_MY_PROFILE, GET_MY_PROFILE_SUCCESS, GET_MY_PROFILE_FAIL } from './constants';

export default MyProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MY_PROFILE: {
      return {
        ...state,
        isLoading: true
      }
    }
    case GET_MY_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case GET_MY_PROFILE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default: return state
  }
}

import { initialState } from './state';
import * as ActionTypes from './constants'

export default MyUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REGISTER:
    case ActionTypes.LOGIN: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
        message: null
      }
    }
    case ActionTypes.LOGIN_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: action.message
      }
    }
    case ActionTypes.LOGOUT: {
      return initialState
    }
    default: return state
  }
}
import { initialState } from './state';
import * as ActionTypes from './constants'

export default RoomListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ROOM_LIST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_ROOM_LIST_SUCCESS: {
      return {
        ...state,
        rooms: state.rooms.concat(action.payload),
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_ROOM_LIST_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.REST_ROOM_LIST: return initialState
    default: return state
  }
}

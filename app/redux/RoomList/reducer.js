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
    case ActionTypes.UPDATE_ROOM_BY_ID: {
      const index = state.rooms.map(x => x._id).indexOf(action.notification.roomId)

      state.rooms[index] = {
        ...state.rooms[index],
        lastMessage: {
          text: action.notification.text,
          createdAt: Date.now()
        },
        updatedAt: Date.now(),
      }

      return { ...state }
    }
    case ActionTypes.REST_ROOM_LIST: return initialState
    default: return state
  }
}

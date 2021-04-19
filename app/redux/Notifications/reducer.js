import { initialState } from './state';
import * as ActionTypes from './constants'

export default NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_NOTIFICATIONS: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.DELETE_NOTIFICATION_BY_ID_SUCCESS: {
      return {
        ...state,
        list: state.list.filter(x => x._id !== action.id)
      }
    }
    case ActionTypes.GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        list: state.list.concat(action.payload),
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.ADD_ONE_NOTIFICATIONS_FEED: {
      return {
        ...state,
        list: [action.payload, state.list]
      }
    }
    case ActionTypes.GET_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.REFRESH_NOTIFICATIONS: {
      return {
        ...state,
        isRefreshing: true
      }
    }
    case ActionTypes.REFRESH_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isRefreshing: false,
        error: null,
      }
    }
    case ActionTypes.REFRESH_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        isRefreshing: false,
        error: action.payload
      }
    }
    case ActionTypes.PUT_VIEW_ON_NOTIFICATION_BY_ID: {

      const newList = [...state.list]
      const found = state.list.map(x => x._id).indexOf(action.id)
      newList[found].read = true

      return {
        ...state,
        list: newList
      }
    }
    case ActionTypes.RESET_NOTIFICATIONS: return initialState
    default: return { ...state }
  }
}

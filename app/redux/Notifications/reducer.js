import { initialState } from './state';
import * as ActionTypes from './constants'

export default NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ACTIVITY_NOTIFICATIONS: {
      return {
        ...state,
        activity_isLoading: true
      }
    }
    case ActionTypes.GET_REQUEST_NOTIFICATIONS: {
      return {
        ...state,
        request_isLoading: true
      }
    }
    case ActionTypes.DELETE_NOTIFICATION_BY_ID_SUCCESS: {
      return {
        ...state,
        activity_list: state.activity_list.filter(x => x._id !== action.id)
      }
    }
    case ActionTypes.GET_ACTIVITY_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        activity_list: state.activity_list.concat(action.payload),
        activity_isLoading: false,
        activity_error: null,
      }
    }
    case ActionTypes.GET_REQUEST_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        request_list: state.request_list.concat(action.payload),
        request_isLoading: false,
        request_error: null,
      }
    }
    case ActionTypes.ADD_ONE_NOTIFICATIONS_FEED: {
      return {
        ...state,
        activity_list: [action.payload, state.activity_list]
      }
    }
    case ActionTypes.GET_ACTIVITY_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        activity_isLoading: false,
        activity_error: action.payload
      }
    }
    case ActionTypes.GET_REQUEST_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        request_isLoading: false,
        request_error: action.payload
      }
    }
    case ActionTypes.REFRESH_ACTIVITY_NOTIFICATIONS: {
      return {
        ...state,
        activity_isRefreshing: true
      }
    }
    case ActionTypes.REFRESH_REQUEST_NOTIFICATIONS: {
      return {
        ...state,
        request_isRefreshing: true
      }
    }
    case ActionTypes.REFRESH_ACTIVITY_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        activity_list: action.payload,
        activity_isRefreshing: false,
        activity_error: null,
      }
    }
    case ActionTypes.REFRESH_REQUEST_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        request_list: action.payload,
        request_isRefreshing: false,
        request_error: null,
      }
    }
    case ActionTypes.REFRESH_ACTIVITY_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        activity_isRefreshing: false,
        activity_error: action.payload
      }
    }
    case ActionTypes.REFRESH_REQUEST_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        request_isRefreshing: false,
        request_error: action.payload
      }
    }
    case ActionTypes.PUT_VIEW_ON_NOTIFICATION_BY_ID: {
      const newList = [...state.activity_list]
      const found = state.activity_list.map(x => x._id).indexOf(action.id)
      newList[found].read = true
      return {
        ...state,
        activity_list: newList
      }
    }
    case ActionTypes.GET_NOTIFICATIONS_NUMBER_SUCCESS: {
      return {
        ...state,
        requestNumber: action.request,
        activityNumber: action.activity
      }
    }
    case ActionTypes.RESET_ACTIVITY_NOTIFICATIONS_NUMBER: {
      return {
        ...state,
        activityNumber: 0
      }
    }
    case ActionTypes.RESET_FRIEND_REQUEST_NOTIFICATIONS_NUMBER: {
      return {
        ...state,
        requestNumber: 0
      }
    }
    case ActionTypes.RESET_ACTIVITY_NOTIFICATIONS: {
      return {
        ...state,
        activity_list: []
      }
    }
    case ActionTypes.RESET_REQUEST_NOTIFICATIONS: {
      return {
        ...state,
        request_list: []
      }
    }
    case ActionTypes.DELETE_REQUEST_BY_ID: {
      return {
        ...state,
        request_list: state.request_list.filter(x => x.from._id !== action.id)
      }
    }
    case ActionTypes.ADD_ONE_REQUEST_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        request_list: state.request_list.concat([{
          from: {
            _id: action.notification.profileId,
            pictureprofile: action.notification.profilePictureLink,
            _meta: {
              pseudo: action.notification.profileName
            }
          },
          type: 'FriendRequest'
        }])
      }
    }
    default: return { ...state }
  }
}

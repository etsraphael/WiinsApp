import { initialState } from './state';
import * as ActionTypes from './constants';

export default ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PROFILE: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_PROFILE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.ASK_FRIEND_SUCCESS: {
      state.profile.relation = 'pendingFromMe'
      return {
        ...state
      }
    }
    case ActionTypes.CANCEL_ASK_FRIEND_SUCCESS : {
      state.profile.relation = 'not-friend'
      return {
        ...state
      }
    }
    case ActionTypes.FOLLOW_PROFILE_SUCCESS : {
      state.profile.relationFollowing = true
      return {
        ...state
      }
    }
    case ActionTypes.UNFOLLOW_PROFILE_SUCCESS : {
      state.profile.relationFollowing = false
      return {
        ...state
      }
    }
    case ActionTypes.CONFIRM_FRIEND_SUCCESS : {
      state.profile.relation = 'friend'
      return {
        ...state
      }
    }
    default: return { ...state }
  }
}

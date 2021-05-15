import { initialState } from './state';
import * as ActionTypes from './constants'

export default MyProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_MY_PROFILE: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_MY_PROFILE_SUCCESS: {
      return {
        ...state,
        profile: action.payload,
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_MY_PROFILE_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.EDIT_PROFILE_PHOTO: {
      return {
        ...state,
        photoProfileIsLoading: true
      }
    }
    case ActionTypes.EDIT_COVER_PHOTO: {
      return {
        ...state,
        photoCoverIsLoading: true
      }
    }
    case ActionTypes.EDIT_PROFILE_PHOTO_FAIL: {
      return {
        ...state,
        photoProfileIsLoading: false
      }
    }
    case ActionTypes.EDIT_COVER_PHOTO_FAIL: {
      return {
        ...state,
        photoCoverIsLoading: false
      }
    }
    case ActionTypes.EDIT_PROFILE_PHOTO_SUCCESS: {
      state.profile.pictureprofile = action.url
      return {
        ...state,
        photoProfileIsLoading: false
      }
    }
    case ActionTypes.EDIT_COVER_PHOTO_SUCCESS: {
      state.profile.picturecover = action.url
      return {
        ...state,
        photoProfileIsLoading: false
      }
    }
    default: return { ...state }
  }
}

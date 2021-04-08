import { initialState } from './state';
import * as ActionTypes from './constants'

export default StoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_STORIES: {
      return {
        ...state,
        isLoading: true
      }
    }
    case ActionTypes.GET_STORIES_SUCCESS: {
      return {
        ...state,
        stories: state.stories.concat(action.payload),
        isLoading: false,
        error: null,
      }
    }
    case ActionTypes.GET_STORIES_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.REFRESH_STORIES: {
      return {
        ...state,
        isRefreshing: true
      }
    }
    case ActionTypes.REFRESH_STORIES_SUCCESS: {
      return {
        ...state,
        stories: action.payload,
        isRefreshing: false,
        error: null,
      }
    }
    case ActionTypes.REFRESH_STORIES_FAIL: {
      return {
        ...state,
        isRefreshing: false,
        error: action.payload
      }
    }
    case ActionTypes.GET_STACK: {
      return {
        ...state,
        oneStoryIsLoading: true
      }
    }
    case ActionTypes.GET_STACK_SUCCESS: {
      const indexFound = state.stories.map(x => x._id).indexOf(action.payload.profile._id)
      state.stories[indexFound].stack = action.payload
      state.stories[indexFound].stack.publicationList = state.stories[indexFound].stack.publicationList
      return {
        ...state,
        oneStoryIsLoading: false,
        currentIndexStory: action.index
      }
    }
    case ActionTypes.GET_STACK_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    case ActionTypes.MOVE_TO_PREVIOUS_STACK: {
      return {
        ...state,
        currentIndexStory: (state.currentIndexStory - 1)
      }
    }
    case ActionTypes.STORY_SEEN: {
      const indexFound = state.stories.map(x => x._id).indexOf(action.profileId)
      state.stories[indexFound].lastStoryView = action.storyId
      return {
        ...state
      }
    }
    case ActionTypes.UPDATE_WITH_MY_NEW_STORY: {
      const found = state.stories.map(x => x._id).indexOf(action.myProfileId)
      // if we found the trend
      if(found !== -1) {
        state.stories[found].lastStoryView = null
      }

      return {
        ...state
      }
    }


    case ActionTypes.RESET_STORIES: return { ...initialState }
    default: return { ...state }
  }
}

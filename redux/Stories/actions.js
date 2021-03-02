import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { sendError } from './../../app/services/error/error-service'

export function storySeen(profileId, storyId) {
    return { type: ActionTypes.STORY_SEEN, profileId, storyId }
}

export function getStoriesSuccess(payload) {
    return { type: ActionTypes.GET_STORIES_SUCCESS, payload }
}

export function getStoriesStart() {
    return { type: ActionTypes.GET_STORIES }
}

export function getStoriesFail(payload) {
    return { type: ActionTypes.GET_STORIES_FAIL, payload }
}

export function getStackSuccess(payload, index) {
    return { type: ActionTypes.GET_STACK_SUCCESS, payload, index }
}

export function moveToPreviousStack() {
    return { type: ActionTypes.MOVE_TO_PREVIOUS_STACK }
}

export function getStackStart() {
    return { type: ActionTypes.GET_STACK }
}

export function getStackFail(payload) {
    return { type: ActionTypes.GET_STACK_FAIL, payload }
}

export function resetStack() {
    return { type: ActionTypes.RESET_STACK }
}

export function resetPublication() {
    return { type: ActionTypes.RESET_STORIES }
}

export function getStoriesActions(page) {
    return async (dispatch) => {
        try {

            dispatch(getStoriesStart())
            if (page == 1) dispatch(resetPublication())
            const token = await AsyncStorage.getItem('userToken')
            const url = `https://wiins-backend.herokuapp.com/stories/followerAndFriend/8/${page}`

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) return dispatch(getStoriesSuccess(response.results))
                    return dispatch(getStoriesFail(response))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getStoriesFail(error));
        }
    };
}

export function resetStoriesActions() {
    return async (dispatch) => dispatch(resetPublication())
}

export function getStackActions(id, index) {
    return async (dispatch) => {
        try {

            dispatch(getStackStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = `https://wiins-backend.herokuapp.com/stories/getstorystackbyid/${id}`

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status == 200) return dispatch(getStackSuccess(response.stack, index))
                    return dispatch(getStackFail(response))
                })
        } catch (error) { 
            sendError(error)
            return dispatch(getStackFail(error)) 
        }
    }
}

export function moveToPreviousActions() {
    return (dispatch) => dispatch(moveToPreviousStack())
}

export function storySeenActions(profileId, storyId) {
    return async (dispatch) => {
        dispatch(storySeen(profileId, storyId))
        try {
            const token = await AsyncStorage.getItem('userToken')
            const url = `https://wiins-backend.herokuapp.com/stories/addViewOnStory/${storyId}`

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
        } catch (error) { 
            sendError(error)
            return null
        }

    }
}
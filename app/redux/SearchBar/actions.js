import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage';
import { sendError } from './../../../app/services/error/error-service'

export function searchSuccess(publication) {
    return { type: ActionTypes.SEARCH_SUCCESS, payload: publication }
}

export function searchTagFriendSuccess(payload) {
    return { type: ActionTypes.COMPLETE_TAG_LIST, payload }
}

export function searchSuccessWithCategory(payload, type) {
    switch (type) {
        case 'ProfileSuggestion': return { type: ActionTypes.COMPLETE_PROFILE_LIST, payload }
        case 'PageSuggestion': return { type: ActionTypes.COMPLETE_PAGE_LIST, payload }
        case 'GroupSuggestion': return { type: ActionTypes.COMPLETE_GROUP_LIST, payload }
        case 'MusicSuggestion': return { type: ActionTypes.COMPLETE_MUSIC_LIST, payload }
        case 'MusicProjectSuggestion': return { type: ActionTypes.COMPLETE_MUSIC_PROJECT_LIST, payload }
        default: return null
    }
}

export function searchStart() {
    return { type: ActionTypes.SEARCH }
}

export function searchFail(error) {
    return { type: ActionTypes.SEARCH_FAIL, payload: error }
}

export function searchReset() {
    return { type: ActionTypes.SEARCH_RESET }
}

export function searchResetActions() {
    return async (dispatch) => dispatch(searchReset())
}

export function discoverSearch(name) {
    return async (dispatch) => {
        try {
            dispatch(searchStart())

            const token = await AsyncStorage.getItem('userToken')
            const url = `https://wiins-backend.herokuapp.com/search?q=${name}&p=1`

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) return dispatch(searchSuccess(response.results))
                    return dispatch(searchFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(searchFail(error));
        }
    };
}

export function discoverSearchWithCategory(name, category) {
    return async (dispatch) => {
        try {
            await dispatch(searchReset())
            await dispatch(searchStart())

            const token = await AsyncStorage.getItem('userToken')
            const url = `https://wiins-backend.herokuapp.com/search/${category}?q=${name}&p=1`

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) {
                        return dispatch(searchSuccessWithCategory(response.results, category))
                    }
                    return dispatch(searchFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(searchFail(error));
        }
    }
}

export function friendsearch(name) {
    return async (dispatch) => {

        try {
            dispatch(searchStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/friends/profiles?q=' + name

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) return dispatch(searchSuccess(response.results))
                    return dispatch(searchFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(searchFail(error));
        }
    };
}

export function tagSearchAction(name) {
    return async (dispatch) => {
        try {
            dispatch(searchStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/friends/profiles?q=' + name

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) return dispatch(searchTagFriendSuccess(response.results))
                    return dispatch(searchFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(searchFail(error));
        }
    };
}
import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { sendError } from './../../../app/services/error/error-service'

export function refreshPublicationsSuccess(publications) {
    return {
        type: ActionTypes.REFRESH_PUBLICATIONS_SUCCESS,
        payload: publications,
    }
}

export function refreshPublicationsStart() {
    return { type: ActionTypes.REFRESH_PUBLICATIONS }
}

export function refreshPublicationsFail(error) {
    return {
        type: ActionTypes.REFRESH_PUBLICATIONS_FAIL,
        payload: error,
    }
}

export function getPublicationsSuccess(publications) {
    return {
        type: ActionTypes.GET_PUBLICATIONS_SUCCESS,
        payload: publications,
    }
}

export function getPublicationsStart() {
    return { type: ActionTypes.GET_PUBLICATIONS }
}

export function getPublicationsFail(error) {
    return {
        type: ActionTypes.GET_PUBLICATIONS_FAIL,
        payload: error,
    }
}

export function resetPublication() {
    return {
        type: ActionTypes.RESET_PUBLICATIONS
    }
}

export function likePublicationSuccess(id) {
    return { type: ActionTypes.LIKE_PUBLICATIONS_DISCOVER_SUCCESS, id }
}

export function likePublicationStart() {
    return { type: ActionTypes.LIKE_PUBLICATIONS_DISCOVER }
}

export function likePublicationFail(error) {
    return { type: ActionTypes.LIKE_PUBLICATIONS_DISCOVER_FAIL,  payload: error }
}

export function unlikePublicationSuccess(id) {
    return { type: ActionTypes.UNLIKE_PUBLICATIONS_DISCOVER_SUCCESS, id }
}

export function unlikePublicationStart() {
    return { type: ActionTypes.UNLIKE_PUBLICATIONS_DISCOVER }
}

export function unlikePublicationFail(error) {
    return { type: ActionTypes.UNLIKE_PUBLICATIONS_DISCOVER_PROFILE_FAIL,  payload: error }
}

export function getByName(page, name) {
    return async (dispatch) => {
        try {
            if(page == 1) dispatch(resetPublication())
            dispatch(getPublicationsStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/publication/discover/hastag/' + name + '?limit=18' + '&page=' + page

            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 200) return dispatch(getPublicationsSuccess(response.results))
                    return dispatch(getPublicationsFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getPublicationsFail(error));
        }
    };
}

export function getTrend(page) {
    return async (dispatch) => {
        try {
            if(page == 1) dispatch(resetPublication())
            dispatch(getPublicationsStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/publication/discover?limit=18' + '&page=' + page

            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then( (response) => {
                    if (response.status == 200) return dispatch(getPublicationsSuccess(response.results))
                    return dispatch(getPublicationsFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getPublicationsFail(error));
        }
    }
}

export function likePublicationDiscover(like) {
    return async (dispatch) => {
        try {
            dispatch(likePublicationStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/likes'
            return fetch(url, {
                method: 'POST',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(like)
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 201) return dispatch(likePublicationSuccess(like.publicationID))
                    return dispatch(likePublicationFail(response))
                })
        } catch (error) {
            sendError(error)
            return dispatch(likePublicationFail(error));
        }
    }
}

export function unlikePublicationDiscover(id) {
    return async (dispatch) => {
        try {
            dispatch(unlikePublicationStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/likes/dislikeFeedPublication/' + id
            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 202) return dispatch(unlikePublicationSuccess(id))
                    return dispatch(unlikePublicationFail(response))
                })
        } catch (error) {
            sendError(error)
            return dispatch(unlikePublicationFail(error))
        }
    }
}

export function resetPublicationActions() {
    return async (dispatch) => dispatch(resetPublication())
}

export function refreshTrend() {
    return async (dispatch) => {
        try {
            dispatch(refreshPublicationsStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/publication/discover?limit=18&page=1'

            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then( (response) => {
                    if (response.status == 200) return dispatch(refreshPublicationsSuccess(response.results))
                    return dispatch(refreshPublicationsFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(refreshPublicationsFail(error));
        }
    }
}


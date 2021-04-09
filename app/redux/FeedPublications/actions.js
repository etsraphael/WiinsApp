import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { sendError } from './../../../app/services/error/error-service'
import Snackbar from 'react-native-snackbar'
import I18n from '../../../assets/i18n/i18n'

export function deletePublicationByIdStart() {
    return { type: ActionTypes.DELETE_PUBLICATION_BY_ID }
}

export function deletePublicationByIdSuccess(id) {
    return { type: ActionTypes.DELETE_PUBLICATION_BY_ID_SUCCESS, id }
}

export function deletePublicationByIdFail(error) {
    return {
        type: ActionTypes.DELETE_PUBLICATION_BY_ID_FAIL,
        payload: error
    }
}

export function addOnePublicationOnFeed(payload) {
    return { type: ActionTypes.ADD_ONE_PUBLICATIONS_FEED, payload }
}

export function refreshPublicationsStart() {
    return { type: ActionTypes.REFRESH_PUBLICATIONS }
}

export function refreshPublicationsSuccess(publication) {
    return {
        type: ActionTypes.REFRESH_PUBLICATIONS_SUCCESS,
        payload: publication,
    }
}

export function refreshPublicationsFail(error) {
    return {
        type: ActionTypes.REFRESH_PUBLICATIONS_FAIL,
        payload: error
    }
}

export function addPublicationStart() {
    return { type: ActionTypes.ADD_PUBLICATIONS_FEED }
}

export function addPublicationFail(error) {
    return { type: ActionTypes.ADD_PUBLICATIONS_FEED_FAIL,  payload: error }
}

export function addPublicationSuccess() {
    return { type: ActionTypes.ADD_PUBLICATIONS_FEED_SUCCESS }
}

export function getPublicationsSuccess(publication) {
    return {
        type: ActionTypes.GET_PUBLICATIONS_SUCCESS,
        payload: publication,
    }
}

export function getPublicationsStart() {
    return { type: ActionTypes.GET_PUBLICATIONS }
}

export function getPublicationsFail(error) {
    return {
        type: ActionTypes.GET_PUBLICATIONS_FAIL,
        payload: error
    }
}

export function likePublicationSuccess(id) {
    return { type: ActionTypes.LIKE_PUBLICATIONS_FEED_SUCCESS, id }
}

export function likePublicationStart() {
    return { type: ActionTypes.LIKE_PUBLICATIONS_FEED }
}

export function likePublicationFail(error) {
    return { type: ActionTypes.LIKE_PUBLICATIONS_FEED_FAIL,  payload: error }
}

export function unlikePublicationSuccess(id) {
    return { type: ActionTypes.UNLIKE_PUBLICATIONS_FEED_SUCCESS, id }
}

export function unlikePublicationStart() {
    return { type: ActionTypes.UNLIKE_PUBLICATIONS_FEED }
}

export function unlikePublicationFail(error) {
    return { type: ActionTypes.UNLIKE_PUBLICATIONS_FEED_FAIL,  payload: error }
}

export function resetPublication() {
    return { type: ActionTypes.RESET_PUBLICATIONS }
}

export function getByModeFeed(page, mode) {

    return async (dispatch) => {
        try {
            if(page == 1) dispatch(resetPublication())
            dispatch(getPublicationsStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/publication/' + mode + '?limit=8' + '&page=' + page

            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response=> {
                    if (response.status == 200) {
                        return dispatch(getPublicationsSuccess(response.results))
                    }
                    else return dispatch(getPublicationsFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getPublicationsFail(error));
        }
    };
}

export function likePublicationFeed(like) {
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
    };
}

export function unlikePublicationFeed(id) {
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
    };
}

export function resetPublicationActions() {
    return (dispatch) => dispatch(resetPublication())
}

export function addPublication(publication) {

    return async (dispatch) => {

        try {

            dispatch(addPublicationStart())

            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/publication'

            return fetch(url, {
                method: 'POST',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(publication)
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status == 201) return dispatch(addPublicationSuccess())
                    return dispatch(addPublicationFail(response))
                })

        
        } catch (error) {
            sendError(error)
            return dispatch(addPublicationFail(error));
        }
    }

}

export function refreshFeed() {
    return async (dispatch) => {
        try {
            dispatch(refreshPublicationsStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/publication/FollowerAndFriend?limit=8&page=1'

            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response=> {
                    if (response.status == 200) {
                        return dispatch(refreshPublicationsSuccess(response.results))
                    }
                    else return dispatch(refreshPublicationsFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(refreshPublicationsFail(error));
        }
    }
}

export function deleteFeedPublicationById(id) {
    return async (dispatch) => {
        try {

            dispatch(deletePublicationByIdStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = `https://wiins-backend.herokuapp.com/publication/delete/${id}`

            return fetch(url, {
                method: 'DELETE',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response=> {
                    if (response.status == 200) {
                        Snackbar.show({ text: I18n.t('VALID-MESSAGE.update-is-done'), duration: Snackbar.LENGTH_LONG })
                        return dispatch(deletePublicationByIdSuccess(id))
                    }
                    else return dispatch(deletePublicationByIdFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(deletePublicationByIdFail(error));
        }
    }
}
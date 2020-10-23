import * as ActionTypes from './constants'
import { AsyncStorage } from 'react-native';

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
        payload: error,
    }
}

export function resetPublication() {
    return {
        type: ActionTypes.RESET_PUBLICATIONS
    }
}

export function likePublicationSuccess(id) {
    return { type: ActionTypes.LIKE_PUBLICATIONS_PROFILE_SUCCESS, id }
}

export function likePublicationStart() {
    return { type: ActionTypes.LIKE_PUBLICATIONS_PROFILE }
}

export function likePublicationFail(error) {
    return { type: ActionTypes.LIKE_PUBLICATIONS_PROFILE_FAIL,  payload: error }
}

export function unlikePublicationSuccess(id) {
    return { type: ActionTypes.UNLIKE_PUBLICATIONS_PROFILE_SUCCESS, id }
}

export function unlikePublicationStart() {
    return { type: ActionTypes.UNLIKE_PUBLICATIONS_PROFILE }
}

export function unlikePublicationFail(error) {
    return { type: ActionTypes.UNLIKE_PUBLICATIONS_PROFILE_FAIL,  payload: error }
}

export function getByMode(page, mode) {
    return async (dispatch) => {
        try {
            if(page == 1) dispatch(resetPublication())
            dispatch(getPublicationsStart())
            const token = await AsyncStorage .getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/publication/' + mode + '?limit=8' + '&page=' + page

            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 200) {
                        return dispatch(getPublicationsSuccess(response.results))
                    }
                    return dispatch(getPublicationsFail(response.message))
                })
        } catch (error) {
            return dispatch(getPublicationsFail(error));
        }
    };
}

export function likePublicationProfile(like) {
    return async (dispatch) => {
        try {
            dispatch(likePublicationStart())
            const token = await AsyncStorage .getItem('userToken')
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
                    if (response.status == 201) return dispatch(likePublicationSuccess(like.publicationId))
                    return dispatch(likePublicationFail(response))
                })
        } catch (error) {
            return dispatch(likePublicationFail(error));
        }
    };
}

export function unlikePublicationProfile(id) {
    return async (dispatch) => {
        try {
            dispatch(unlikePublicationStart())
            const token = await AsyncStorage .getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/likes/dislikePublication/' + id
            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 201) return dispatch(unlikePublicationSuccess(id))
                    return dispatch(unlikePublicationFail(response))
                })
        } catch (error) {
            return dispatch(unlikePublicationFail(error))
        }
    };
}

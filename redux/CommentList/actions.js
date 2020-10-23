import * as ActionTypes from './constants'
import { AsyncStorage } from 'react-native'

export function likeCommentSuccess(id) {
    return {
        type: ActionTypes.LIKE_COMMENT_SUCCESS,
        id
    }
}

export function likeCommentStart() {
    return { type: ActionTypes.LIKE_COMMENT }
}

export function likeCommentFail(error) {
    return {
        type: ActionTypes.LIKE_COMMENT_FAIL,
        payload: error,
    }
}


export function unlikeCommentSuccess(id) {
    return {
        type: ActionTypes.UNLIKE_COMMENT_SUCCESS,
        id
    }
}

export function unlikeCommentStart() {
    return { type: ActionTypes.UNLIKE_COMMENT }
}

export function unlikeCommentFail(error) {
    return {
        type: ActionTypes.UNLIKE_COMMENT_FAIL,
        payload: error,
    }
}

export function getCommentListSuccess(menu) {
    return {
        type: ActionTypes.GET_COMMENT_LIST_SUCCESS,
        payload: menu
    }
}

export function getCommentListStart() {
    return { type: ActionTypes.GET_COMMENT_LIST }
}

export function getCommentListFail(error) {
    return {
        type: ActionTypes.GET_COMMENT_LIST_FAIL,
        payload: error,
    }
}

export function resetComment() {
    return { type: ActionTypes.RESET_COMMENT_LIST }
}

export function sendCommentStart() {
    return { type: ActionTypes.SEND_COMMENT }
}

export function sendCommentSuccess(response) {
    return {
        type: ActionTypes.SEND_COMMENT_SUCCESS,
        payload: response
    }
}

export function sendCommentFail(error) {
    return {
        type: ActionTypes.SEND_COMMENT_FAIL,
        payload: error,
    }
}


export function likeCommentPublication(like) {
    return async (dispatch) => {
        try {
            dispatch(likeCommentStart())
            const url = 'https://wiins-backend.herokuapp.com/likes/comment'
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'POST',
                headers: {  
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(like)
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(likeCommentSuccess(response.id))
                    return dispatch(likeCommentFail(response))
                })
        } catch (error) {
            return dispatch(likeCommentFail(error))
        }
    }
}

export function unlikeCommentPublication(id) {
    return async (dispatch) => {
        try {
            dispatch(unlikeCommentStart())
            const url = 'https://wiins-backend.herokuapp.com/likes/comment/' + id
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'GET',
                headers: {  
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(unlikeCommentSuccess(id))
                    return dispatch(unlikeCommentFail(response))
                })
        } catch (error) {
            return dispatch(unlikeCommentFail(error))
        }
    }
}

export function sendCommentToPage(comment) {
    return async (dispatch) => {
        try {
            dispatch(sendCommentStart())
            const url = 'https://wiins-backend.herokuapp.com/comments/toPublicationPage'
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'POST',
                headers: {  
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(comment)
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(sendCommentSuccess(response.comment))
                    return dispatch(sendCommentFail(response))
                })
        } catch (error) {
            return dispatch(sendCommentFail(error))
        }
    }
}

export function sendCommentToPlaylist(comment) {
    return async (dispatch) => {
        try {
            dispatch(sendCommentStart())
            const url = 'https://wiins-backend.herokuapp.com/comments/toPlaylist'
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'POST',
                headers: {  
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(comment)
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(sendCommentSuccess(response.comment))
                    return dispatch(sendCommentFail(response))
                })
        } catch (error) {
            return dispatch(sendCommentFail(error))
        }
    }
}

export function sendCommentToProfile(comment) {
    return async (dispatch) => {
        try {
            dispatch(sendCommentStart())
            const url = 'https://wiins-backend.herokuapp.com/comments/toPublicationProfile'
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'POST',
                headers: {  
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(comment)
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(sendCommentSuccess(response.comment))
                    return dispatch(sendCommentFail(response))
                })
        } catch (error) {
            return dispatch(sendCommentFail(error))
        }
    }
}

export function getCommentListPlaylist(id, page) {
    return async (dispatch) => {
        try {
            dispatch(getCommentListStart())
            const url = 'https://wiins-backend.herokuapp.com/comments/playlist/' + id + '?limit=12&page=' + page
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(getCommentListSuccess(response.results))
                    return dispatch(getCommentListFail(response.message))
                })
        } catch (error) {
            return dispatch(getCommentListFail(error));
        }
    };
}

export function getCommentListPublication(id, page) {
    return async (dispatch) => {
        try {
            dispatch(getCommentListStart())
            const url = 'https://wiins-backend.herokuapp.com/comments/publication/' + id + '?limit=12&page=' + page
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(getCommentListSuccess(response.results))
                    return dispatch(getCommentListFail(response.message))
                })
        } catch (error) {
            return dispatch(getCommentListFail(error));
        }
    };
}
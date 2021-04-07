import * as ActionTypes from './constants'
import { UPDATE_COMMENT_PUBLICATIONS_DISCOVER_SUCCESS } from './../DiscoverPublications/constants'
import { UPDATE_COMMENT_PUBLICATIONS_FEED_SUCCESS } from './../FeedPublications/constants'
import { UPDATE_COMMENT_PUBLICATIONS_PROFILE_SUCCESS } from './../ProfilePublications/constants'
import AsyncStorage from '@react-native-community/async-storage'
import { sendError } from './../../../app/services/error/error-service'

export function likeReponseSuccess(id) {
    return { type: ActionTypes.LIKE_RESPONSE_SUCCESS, id }
}

export function likeReponseStart() {
    return { type: ActionTypes.LIKE_RESPONSE }
}

export function likeReponseFail(error) {
    return { type: ActionTypes.LIKE_RESPONSE_FAIL, payload: error }
}

export function unlikeReponseSuccess(id) {
    return { type: ActionTypes.UNLIKE_RESPONSE_SUCCESS, id }
}

export function unlikeReponseStart() {
    return { type: ActionTypes.UNLIKE_RESPONSE }
}

export function unlikeReponseFail(error) {
    return { type: ActionTypes.UNLIKE_RESPONSE_FAIL, payload: error }
}

export function updateCommentStat(publicationId, space) {
    switch (space) {
        case 'feed': return { type: UPDATE_COMMENT_PUBLICATIONS_FEED_SUCCESS, id: publicationId }
        case 'profile': return { type: UPDATE_COMMENT_PUBLICATIONS_PROFILE_SUCCESS, id: publicationId }
        case 'discover': return { type: UPDATE_COMMENT_PUBLICATIONS_DISCOVER_SUCCESS, id: publicationId }
        default: return null
    }
}

export function getResponseStart() {
    return { type: ActionTypes.GET_REPONSE_LIST }
}

export function getResponseSuccess(id, results) {
    return { type: ActionTypes.GET_REPONSE_LIST_SUCCESS, id, results }
}

export function getResponseFail(error) {
    return { type: ActionTypes.GET_REPONSE_LISTT_FAIL, payload: error }
}

export function likeCommentSuccess(id) {
    return { type: ActionTypes.LIKE_COMMENT_SUCCESS, id }
}

export function likeCommentStart() {
    return { type: ActionTypes.LIKE_COMMENT }
}

export function likeCommentFail(error) {
    return { type: ActionTypes.LIKE_COMMENT_FAIL, payload: error }
}

export function unlikeCommentSuccess(id) {
    return { type: ActionTypes.UNLIKE_COMMENT_SUCCESS, id }
}

export function unlikeCommentStart() {
    return { type: ActionTypes.UNLIKE_COMMENT }
}

export function unlikeCommentFail(error) {
    return { type: ActionTypes.UNLIKE_COMMENT_FAIL, payload: error, }
}

export function getCommentListSuccess(menu) {
    return { type: ActionTypes.GET_COMMENT_LIST_SUCCESS, payload: menu }
}

export function getCommentListStart() {
    return { type: ActionTypes.GET_COMMENT_LIST }
}

export function getCommentListFail(error) {
    return { type: ActionTypes.GET_COMMENT_LIST_FAIL, payload: error, }
}

export function resetComment() {
    return { type: ActionTypes.RESET_COMMENT_LIST }
}

export function sendCommentAnswerStart() {
    return { type: ActionTypes.SEND_ANSWER }
}

export function sendCommentAnswerSuccess(response) {
    return { type: ActionTypes.SEND_ANSWER_SUCCESS, payload: response }
}

export function sendCommentAnswerFail(error) {
    return { type: ActionTypes.SEND_ANSWER_FAIL, payload: error }
}

export function sendCommentStart() {
    return { type: ActionTypes.SEND_COMMENT }
}

export function sendCommentSuccess(response) {
    return { type: ActionTypes.SEND_COMMENT_SUCCESS, payload: response }
}

export function sendCommentFail(error) {
    return { type: ActionTypes.SEND_COMMENT_FAIL, payload: error }
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
            sendError(error)
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
            sendError(error)
            return dispatch(unlikeCommentFail(error))
        }
    }
}

export function likeResponsePublication(like) {
    return async (dispatch) => {
        try {
            dispatch(likeReponseStart())
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
                    if (response.status == 201) return dispatch(likeReponseSuccess(response.id))
                    return dispatch(likeReponseFail(response))
                })
        } catch (error) {
            sendError(error)
            return dispatch(likeReponseFail(error))
        }
    }
}

export function unlikeResponsePublication(id) {
    return async (dispatch) => {
        try {
            dispatch(unlikeReponseStart())
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
                    if (response.status == 201) return dispatch(unlikeReponseSuccess(id))
                    return dispatch(unlikeReponseFail(response))
                })
        } catch (error) {
            sendError(error)
            return dispatch(unlikeReponseFail(error))
        }
    }
}

export function sendCommentToPage(comment, space, reset) {
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
                    if (response.status == 201) {
                        await dispatch(updateCommentStat(comment.publicationId, space))
                        reset()
                        return dispatch(sendCommentSuccess(response.comment))
                    }
                    return dispatch(sendCommentFail(response))
                })
        } catch (error) {
            sendError(error)
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
            sendError(error)
            return dispatch(sendCommentFail(error))
        }
    }
}

export function sendCommentToProfile(comment, space, reset) {
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
                    if (response.status == 201){ 
                        await dispatch(updateCommentStat(comment.publicationId, space))
                        reset()
                        return dispatch(sendCommentSuccess(response.comment))
                    }
                    return dispatch(sendCommentFail(response))
                })
        } catch (error) {
            sendError(error)
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
            sendError(error)
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
                .then((response) => {
                    if (response.status == 200) return dispatch(getCommentListSuccess(response.results))
                    return dispatch(getCommentListFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getCommentListFail(error));
        }
    };
}

export function getResponseByIdAndPage(id, page){
    return async (dispatch) => {
        try {
            dispatch(getResponseStart())
            const url = 'https://wiins-backend.herokuapp.com/comments/response/' + id
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
                    if (response.status == 200) return dispatch(getResponseSuccess(id, response.results))
                    return dispatch(getResponseFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getResponseFail(error));
        }
    };
}

export function sendCommentAnswer(response, reset) {
    return async (dispatch) => {
        try {
            dispatch(sendCommentAnswerStart())
            const url = 'https://wiins-backend.herokuapp.com/comments/response/'
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(response)
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201){ 
                        reset()
                        return dispatch(sendCommentAnswerSuccess(response.comment))
                    }
                    return dispatch(sendCommentAnswerFail(response))
                })
        } catch (error) {
            sendError(error)
            return dispatch(sendCommentAnswerFail(error))
        }
    }
}

export function sendCommentToTube(comment, reset) {
    return async (dispatch) => {
        try {
            dispatch(sendCommentStart())
            const url = 'https://wiins-backend.herokuapp.com/createComment/toTube'
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
                    if (response.status == 201){ 
                        reset()
                        return dispatch(sendCommentSuccess(response.comment))
                    }
                    return dispatch(sendCommentFail(response))
                })
        } catch (error) {
            sendError(error)
            return dispatch(sendCommentFail(error))
        }
    }
}
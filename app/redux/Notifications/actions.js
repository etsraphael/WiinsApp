import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { sendError } from './../../../app/services/error/error-service'
import Snackbar from 'react-native-snackbar'
import I18n from '../../../assets/i18n/i18n'
import { getFeedPublicationByIdStart, getFeedPublicationByIdSuccess, getFeedPublicationByIdFail } from './../PublicationInModal/actions'

export function addOneRequestNotificationStart() {
    return { type: ActionTypes.ADD_ONE_REQUEST_NOTIFICATION }
}

export function addOneRequestNotificationSuccess(payload) {
    return { type: ActionTypes.ADD_ONE_REQUEST_NOTIFICATION_SUCCESS, payload }
}

export function addOneRequestNotificationFail(error) {
    return {
        type: ActionTypes.ADD_ONE_REQUEST_NOTIFICATION_FAIL,
        payload: error
    }
}

export function deleteRequestById(id) {
    return { type: ActionTypes.DELETE_REQUEST_BY_ID, id }
}

export function getNotificationsNumberStart() {
    return { type: ActionTypes.GET_NOTIFICATIONS_NUMBER }
}

export function getNotificationsNumberSuccess(activity, request) {
    return { type: ActionTypes.GET_NOTIFICATIONS_NUMBER_SUCCESS, activity, request }
}

export function getNotificationsNumberFail(payload) {
    return { type: ActionTypes.GET_NOTIFICATIONS_NUMBER_FAIL, payload }
}

export function resetActivityNotificationNumber() {
    return { type: ActionTypes.RESET_ACTIVITY_NOTIFICATIONS_NUMBER }
}

export function resetFriendRequestNotificationNumber() {
    return { type: ActionTypes.RESET_FRIEND_REQUEST_NOTIFICATIONS_NUMBER }
}

export function deleteNotificationByIdStart() {
    return { type: ActionTypes.DELETE_NOTIFICATION_BY_ID }
}

export function deleteNotificationByIdSuccess(id) {
    return { type: ActionTypes.DELETE_NOTIFICATION_BY_ID_SUCCESS, id }
}

export function putViewOnNotificationById(id) {
    return { type: ActionTypes.PUT_VIEW_ON_NOTIFICATION_BY_ID, id }
}

export function deleteNotificationByIdFail(error) {
    return {
        type: ActionTypes.DELETE_NOTIFICATION_BY_ID_FAIL,
        payload: error
    }
}

export function refreshActivityNotificationsStart() {
    return { type: ActionTypes.REFRESH_ACTIVITY_NOTIFICATIONS }
}

export function refreshActivityNotificationsSuccess(payload) {
    return { type: ActionTypes.REFRESH_ACTIVITY_NOTIFICATIONS_SUCCESS, payload }
}

export function refreshActivityNotificationsFail(error) {
    return {
        type: ActionTypes.REFRESH_ACTIVITY_NOTIFICATIONS_FAIL,
        payload: error
    }
}

export function getActivityNotificationsSuccess(payload) {
    return { type: ActionTypes.GET_ACTIVITY_NOTIFICATIONS_SUCCESS, payload }
}

export function getActivityNotificationsStart() {
    return { type: ActionTypes.GET_ACTIVITY_NOTIFICATIONS }
}

export function getActivityNotificationsFail(error) {
    return {
        type: ActionTypes.GET_ACTIVITY_NOTIFICATIONS_FAIL,
        payload: error
    }
}

export function getRequestNotificationsSuccess(payload) {
    return { type: ActionTypes.GET_REQUEST_NOTIFICATIONS_SUCCESS, payload }
}

export function getRequestNotificationsStart() {
    return { type: ActionTypes.GET_REQUEST_NOTIFICATIONS }
}

export function getRequestNotificationsFail(error) {
    return {
        type: ActionTypes.GET_REQUEST_NOTIFICATIONS_FAIL,
        payload: error
    }
}

export function refreshRequestNotificationsStart() {
    return { type: ActionTypes.REFRESH_REQUEST_NOTIFICATIONS }
}

export function refreshRequestNotificationsSuccess(payload) {
    return { type: ActionTypes.REFRESH_REQUEST_NOTIFICATIONS_SUCCESS, payload }
}

export function refreshRequestNotificationsFail(error) {
    return {
        type: ActionTypes.REFRESH_REQUEST_NOTIFICATIONS_FAIL,
        payload: error
    }
}

export function resetActivityNotification() {
    return { type: ActionTypes.RESET_ACTIVITY_NOTIFICATIONS }
}

export function resetRequestNotification() {
    return { type: ActionTypes.RESET_REQUEST_NOTIFICATIONS }
}

export function getActivityNotificationList(page) {

    return async (dispatch) => {
        try {
            if (page == 1) dispatch(resetActivityNotification())
            dispatch(getActivityNotificationsStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/notification/activity/list?limit=10&page=' + page

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 201) {
                        return dispatch(getActivityNotificationsSuccess(response.results))
                    }
                    else return dispatch(getActivityNotificationsFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getActivityNotificationsFail(error));
        }
    };
}

export function getRequestNotificationList() {

    return async (dispatch) => {
        try {
            dispatch(resetRequestNotification())
            dispatch(getRequestNotificationsStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/requests/requestsToMe'

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 200) {
                        return dispatch(getRequestNotificationsSuccess(response.results))
                    }
                    else return dispatch(getRequestNotificationsFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getRequestNotificationsFail(error));
        }
    };
}

export function resetActivityNotificationActions() {
    return (dispatch) => dispatch(resetActivityNotification())
}

export function addNotification(notification) {

    return async (dispatch) => {

        try {

            dispatch(addNotificationStart())

            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/Notification'

            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify(notification)
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status == 201) return dispatch(addNotificationSuccess())
                    return dispatch(addNotificationFail(response))
                })


        } catch (error) {
            sendError(error)
            return dispatch(addNotificationFail(error));
        }
    }

}

export function refreshActivityNotifications() {
    return async (dispatch) => {
        try {
            dispatch(refreshActivityNotificationsStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/notification/activity/list?limit=10&page=1'

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 201) {
                        return dispatch(refreshActivityNotificationsSuccess(response.results))
                    }
                    else return dispatch(refreshActivityNotificationsFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(refreshActivityNotificationsFail(error));
        }
    }
}

export function deleteNotificationById(id) {
    return async (dispatch) => {
        try {

            dispatch(deleteNotificationByIdStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = `https://wiins-backend.herokuapp.com/Notification/delete/${id}`

            return fetch(url, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 200) {
                        Snackbar.show({ text: I18n.t('VALID-MESSAGE.update-is-done'), duration: Snackbar.LENGTH_LONG })
                        return dispatch(deleteNotificationByIdSuccess(id))
                    }
                    else return dispatch(deleteNotificationByIdFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(deleteNotificationByIdFail(error));
        }
    }
}

export function getNotificationTagCommentPublicationAction(publicationId, navigation) {
    return async (dispatch) => {
        try {

            dispatch(getFeedPublicationByIdStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/publication/id/' + publicationId

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) {
                        dispatch(getFeedPublicationByIdSuccess(response.publication, 'notification'))
                        return navigation.goBack()
                    } else {
                        return dispatch(getFeedPublicationByIdFail(response.message))
                    }
                })

        } catch (error) {
            sendError(error)
            return dispatch(getFeedPublicationByIdFail(error))

        }
    }
}

export function getNotificationPublicationLikeAction(publicationId, navigation) {
    return async (dispatch) => {
        try {

            dispatch(getFeedPublicationByIdStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/publication/id/' + publicationId

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) {
                        dispatch(getFeedPublicationByIdSuccess(response.publication, 'notification'))
                        return navigation.goBack()
                    } else {
                        return dispatch(getFeedPublicationByIdFail(response.message))
                    }
                })

        } catch (error) {
            sendError(error)
            return dispatch(getFeedPublicationByIdFail(error))

        }
    }
}

export function putViewOnNotificationByIdAction(id) {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/notification/seenWithId/' + id
            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 202) {
                        return dispatch(putViewOnNotificationById(id))
                    }
                })

        }
        catch (error) {
            return sendError(error)
        }
    }
}

export function getNotificationsNumberAction() {
    return async (dispatch) => {
        try {

            dispatch(getNotificationsNumberStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/notification/request-and-activity'
            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) {
                        return dispatch(getNotificationsNumberSuccess(response.activity, response.request))
                    }
                })

        }
        catch (error) {
            dispatch(getNotificationsNumberFail())
            return sendError(error)
        }
    }
}

export function resetActivityNotificationNumberAction() {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/notification/activity/seen'
            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 202) {
                        return dispatch(resetActivityNotificationNumber())
                    }
                })
        }
        catch (error) {
            return sendError(error)
        }
    }
}

export function resetFriendRequestNotificationNumberAction() {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/notification/request/seen'
            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 202) {
                        return dispatch(resetFriendRequestNotificationNumber())
                    }
                })
        }
        catch (error) {
            return sendError(error)
        }
    }
}

export function confirmFriendRequestAction(id) {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/friends/addWithProfile/' + id
            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status == 200) {
                        return dispatch(deleteRequestById(id))
                    }
                })
        }
        catch (error) {
            return sendError(error)
        }
    }
}

export function refuseFriendRequestAction(id) {
    return async (dispatch) => {
        try {
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/friends/refuseWithProfile/' + id
            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.status == 201) {
                        return dispatch(deleteRequestById(id))
                    }
                })
        }
        catch (error) {
            return sendError(error)
        }
    }
}

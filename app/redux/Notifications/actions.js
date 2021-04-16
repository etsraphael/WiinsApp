import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { sendError } from './../../../app/services/error/error-service'
import Snackbar from 'react-native-snackbar'
import I18n from '../../../assets/i18n/i18n'
import { getFeedPublicationByIdStart, getFeedPublicationByIdSuccess, getFeedPublicationByIdFail } from './../PublicationInModal/actions'

export function deleteNotificationByIdStart() {
    return { type: ActionTypes.DELETE_NOTIFICATION_BY_ID }
}

export function deleteNotificationByIdSuccess(id) {
    return { type: ActionTypes.DELETE_NOTIFICATION_BY_ID_SUCCESS, id }
}

export function deleteNotificationByIdFail(error) {
    return {
        type: ActionTypes.DELETE_NOTIFICATION_BY_ID_FAIL,
        payload: error
    }
}

export function refreshNotificationsStart() {
    return { type: ActionTypes.REFRESH_NOTIFICATIONS }
}

export function refreshNotificationsSuccess(Notification) {
    return {
        type: ActionTypes.REFRESH_NOTIFICATIONS_SUCCESS,
        payload: Notification,
    }
}

export function refreshNotificationsFail(error) {
    return {
        type: ActionTypes.REFRESH_NOTIFICATIONS_FAIL,
        payload: error
    }
}

export function getNotificationsSuccess(payload) {
    return {
        type: ActionTypes.GET_NOTIFICATIONS_SUCCESS,
        payload: payload,
    }
}

export function getNotificationsStart() {
    return { type: ActionTypes.GET_NOTIFICATIONS }
}

export function getNotificationsFail(error) {
    return {
        type: ActionTypes.GET_NOTIFICATIONS_FAIL,
        payload: error
    }
}

export function resetNotification() {
    return { type: ActionTypes.RESET_NOTIFICATIONS }
}

export function getNotificationList(page) {

    return async (dispatch) => {
        try {
            if (page == 1) dispatch(resetNotification())
            dispatch(getNotificationsStart())
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
                        console.log(response.results)
                        return dispatch(getNotificationsSuccess(response.results))
                    }
                    else return dispatch(getNotificationsFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getNotificationsFail(error));
        }
    };
}

export function resetNotificationActions() {
    return (dispatch) => dispatch(resetNotification())
}

export function addNotification(Notification) {

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
                body: JSON.stringify(Notification)
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

export function refreshList() {
    return async (dispatch) => {
        try {
            dispatch(refreshNotificationsStart())
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
                        return dispatch(refreshNotificationsSuccess(response.results))
                    }
                    else return dispatch(refreshNotificationsFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(refreshNotificationsFail(error));
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
                        dispatch(getFeedPublicationByIdSuccess(response.publication, 'feed'))
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
                        dispatch(getFeedPublicationByIdSuccess(response.publication, 'feed'))
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
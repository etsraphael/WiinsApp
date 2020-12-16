import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage';

export function getRoomByIdSuccess(room) {
    return { type: ActionTypes.GET_ROOM_BY_ID_SUCCESS, payload: room }
}

export function getRoomByIdStart() {
    return { type: ActionTypes.GET_ROOM_BY_ID }
}

export function getRoomByIdFail(error) {
    return { type: ActionTypes.GET_ROOM_BY_ID_FAIL, payload: error }
}

export function sendMessageSuccess(response) {
    return { type: ActionTypes.SEND_MESSAGE_SUCCESS, payload: response }
}

export function sendMessageStart(message) {
    return { type: ActionTypes.SEND_MESSAGE, payload: message }
}

export function sendMessageFail(error) {
    return { type: ActionTypes.SEND_MESSAGE_FAIL, payload: error }
}

export function resetRoom() {
    return { type: ActionTypes.REST_ROOM }
}

export function leaveRoom() {
    return (dispatch) => dispatch(resetRoom())
}

export function loadOldMessagesSuccess(room) {
    return { type: ActionTypes.LOAD_OLD_MESSAGE_SUCCESS, payload: room }
}

export function getRoomById(id, page, nBMessage) {
    return async (dispatch) => {
        try {
            if (page == 1) dispatch(resetRoom())
            dispatch(getRoomByIdStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/messenger/getRoomById/' + id + '/' + page + '/' + nBMessage
            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) return dispatch(getRoomByIdSuccess(response.result))
                    return dispatch(getRoomByIdFail(response))
                })
        } catch (error) {
            return dispatch(getRoomByIdFail(error))
        }
    }
}

export function sendMessage(message, idRoom) {
    return async (dispatch) => {
        try {
            dispatch(sendMessageStart(message))
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/messenger/sendMessage/' + idRoom
            return fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
                body: JSON.stringify({message: {text: message.text, type: message.type}})
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(sendMessageSuccess(message))
                    return dispatch(sendMessageFail(response))
                })
        } catch (error) {
            return dispatch(sendMessageFail(error))
        }
    }
}

export function getMessageByPage(id, page, nBMessage) {
    return async (dispatch) => {
        try {
            if(page == 1) return null
            dispatch(getRoomByIdStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/messenger/getRoomById/' + id + '/' + page + '/' + nBMessage
            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(loadOldMessagesSuccess(response.result))
                    return dispatch(getRoomByIdFail(response))
                })
        } catch (error) {
            return dispatch(getRoomByIdFail(error))
        }
    }
}
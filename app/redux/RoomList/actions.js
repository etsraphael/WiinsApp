import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { sendError } from './../../../app/services/error/error-service'

export function roomSeenById(id){
    return { type: ActionTypes.ROOM_SEEN_BY_ID, id }
}

export function getRoomListSuccess(rooms) {
    return { type: ActionTypes.GET_ROOM_LIST_SUCCESS, payload: rooms }
}

export function getRoomListStart() {
    return { type: ActionTypes.GET_ROOM_LIST }
}

export function getRoomListFail(error) {
    return { type: ActionTypes.GET_ROOM_LIST_FAIL, payload: error }
}

export function refreshRoomListStart() {
    return { type: ActionTypes.REFRESH_ROOM_LIST }
}

export function refreshRoomListSuccess(rooms) {
    return { type: ActionTypes.REFRESH_ROOM_LIST_SUCCESS, payload: rooms }
}

export function refreshRoomListFail(error) {
    return { type: ActionTypes.REFRESH_ROOM_LIST_FAIL, payload: error }
}

export function resetRoomList() {
    return { type: ActionTypes.RESET_ROOM_LIST }
}

export function updateRoomNotification(payload) {
    return { type: ActionTypes.UPDATE_ROOM_NOTIFICATION, payload }
}

export function getRoom(page) {
    return async (dispatch) => {
        try {
            if (page == 1) dispatch(resetRoomList())
            dispatch(getRoomListStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/messenger/allRooms/' + page
            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) return dispatch(getRoomListSuccess(response.results))
                    return dispatch(getRoomListFail(response))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getRoomListFail(error))
        }
    }
}

export function refreshRooms() {
    return async (dispatch) => {
        try {
            dispatch(refreshRoomListStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/messenger/allRooms/1'
            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) return dispatch(refreshRoomListSuccess(response.results))
                    return dispatch(refreshRoomListFail(response))
                })
        } catch (error) {
            sendError(error)
            return dispatch(refreshRoomListFail(error))
        }
    }
}
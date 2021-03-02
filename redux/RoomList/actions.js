import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage';
import { sendError } from './../../app/services/error/error-service'

export function getRoomListSuccess(rooms) {
    return { type: ActionTypes.GET_ROOM_LIST_SUCCESS, payload: rooms }
}

export function getRoomListStart() {
    return { type: ActionTypes.GET_ROOM_LIST }
}

export function getRoomListFail(error) {
    return { type: ActionTypes.GET_ROOM_LIST_FAIL, payload: error }
}

export function resetRoomList() {
    return { type: ActionTypes.REST_ROOM_LIST }
}

export function getRoom(page) {
    return async (dispatch) => {
        try {
            if(page == 1) dispatch(resetRoomList())
            dispatch(getRoomListStart())
            const token = await AsyncStorage .getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/messenger/allRooms/' + page
            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 200) return dispatch(getRoomListSuccess(response.results))
                    return dispatch(getRoomListFail(response))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getRoomListFail(error))
        }
    }
}
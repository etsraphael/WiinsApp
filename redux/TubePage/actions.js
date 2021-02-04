import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'

export function likeTubePageSuccess() {
    return { type: ActionTypes.LIKE_TUBE_PAGE_SUCCESS }
}

export function likeTubePageStart() {
    return { type: ActionTypes.LIKE_TUBE_PAGE }
}

export function likeTubePageFail(error) {
    return {
        type: ActionTypes.LIKE_TUBE_PAGE_FAIL,
        payload: error,
    }
}

export function getTubePageSuccess(payload) {
    return { type: ActionTypes.GET_TUBE_PAGE_SUCCESS, payload }
}

export function getTubePageStart() {
    return { type: ActionTypes.GET_TUBE_PAGE }
}

export function getTubePageFail(error) {
    return {
        type: ActionTypes.GET_TUBE_PAGE_FAIL,
        payload: error,
    }
}

export function resetTubePage() {
    return { type: ActionTypes.RESET_TUBE_PAGE }
}

export function getTubePageActions(id) {

    return async (dispatch) => {
        try {
            dispatch(getTubePageStart())
            const token = await AsyncStorage.getItem('userToken')

            return fetch(`https://wiins-backend.herokuapp.com/tube/app/video/${id}`, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then( async (response) => {
                    if (response.status == 201) return dispatch(getTubePageSuccess(response.page))
                    return dispatch(getTubePageFail(response.message))
                })
        } catch (error) {
            return dispatch(getTubePageFail(error));
        }
    }
}

export function likeTubePageActions(id) {

    return async (dispatch) => {
        try {
            dispatch(likeTubePageStart())
            const token = await AsyncStorage.getItem('userToken')

            return fetch(`https://wiins-backend.herokuapp.com/tube/app/video/${id}`, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => response.json())
            .then( async (response) => {
                    if (response.status == 201) return dispatch(likeTubePageSuccess(response.page))
                    return dispatch(likeTubePageFail(response.message))
                })
        } catch (error) {
            return dispatch(likeTubePageFail(error));
        }
    }
}
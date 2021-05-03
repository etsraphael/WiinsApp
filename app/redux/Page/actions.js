import * as ActionTypes from './constants';
import AsyncStorage from '@react-native-community/async-storage';
import { sendError } from './../../../app/services/error/error-service'

export function getPageSuccess(page) {
    return {
        type: ActionTypes.GET_PAGE_SUCCESS,
        payload: page,
    }
}

export function getPageStart() {
    return { type: ActionTypes.GET_PAGE }
}

export function getPageFail(error) {
    return {
        type: ActionTypes.GET_PAGE_FAIL,
        payload: error,
    }
}

export function followSuccess() {
    return {
        type: ActionTypes.FOLLOW_PAGE_SUCCESS
    }
}

export function followStart() {
    return { type: ActionTypes.FOLLOW_PAGE }
}

export function followFail(error) {
    return {
        type: ActionTypes.FOLLOW_PAGE_FAIL,
        payload: error,
    }
}

export function unfollowSuccess() {
    return {
        type: ActionTypes.UNFOLLOW_PAGE_SUCCESS
    }
}

export function unfollowStart() {
    return { type: ActionTypes.UNFOLLOW_PAGE }
}

export function unfollowFail(error) {
    return {
        type: ActionTypes.UNFOLLOW_PAGE_FAIL,
        payload: error,
    }
}


export function getPage(id) {
    return async (dispatch) => {
        try {

            dispatch(getPageStart())
            const token = await AsyncStorage.getItem('userToken')
            return fetch('https://wiins-backend.herokuapp.com/pages/id/' + id, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) return dispatch(getPageSuccess(response.page))
                    return dispatch(getPageFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getPageFail(error));
        }
    };
}

export function followPage(id) {
    return async (dispatch) => {
        try {
            dispatch(followStart())
            const token = await AsyncStorage.getItem('userToken')
            return fetch('https://wiins-backend.herokuapp.com/pages/follow/' + id, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 200) return dispatch(followSuccess())
                    return dispatch(followFail(response.error))
                })
        } catch (error) {
            sendError(error)
            return dispatch(followFail(error))
        }
    }
}

export function unfollowPage(id) {
    return async (dispatch) => {
        try {

            dispatch(unfollowStart())
            const token = await AsyncStorage.getItem('userToken')
            return fetch('https://wiins-backend.herokuapp.com/pages/unfollow/' + id, {
                method: 'POST',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 200) return dispatch(unfollowSuccess())
                    return dispatch(unfollowFail(response.error))
                })
        } catch (error) {
            sendError(error)
            return dispatch(unfollowFail(error))
        }
    };
}

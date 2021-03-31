import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import Snackbar from 'react-native-snackbar';
import { sendError } from './../../../app/services/error/error-service'

export function getMyStorySuccess(payload) {
    return { type: ActionTypes.GET_MY_STORY_SUCCESS, payload }
}

export function getMyStoryStart() {
    return { type: ActionTypes.GET_MY_STORY }
}

export function getMyStoryFail(payload) {
    return {  type: ActionTypes.GET_MY_STORY_FAIL,  payload }
}

export function deleteStoryByIdSuccess(id) {
    Snackbar.show({ text: 'A story was deleted', duration: Snackbar.LENGTH_LONG })
    return { type: ActionTypes.DELETE_STORY_BY_ID_SUCCESS, id }
}

export function deleteStoryByIdStart() {
    Snackbar.show({ text: 'Deletion in progress', duration: Snackbar.LENGTH_LONG })
    return { type: ActionTypes.DELETE_STORY_BY_ID }
}

export function deleteStoryByIdFail(payload) {
    Snackbar.show({ text: 'Deletion error', duration: Snackbar.LENGTH_LONG })
    return {  type: ActionTypes.DELETE_STORY_BY_ID_FAIL,  payload }
}

export function getMyStoryActions() {
    return async (dispatch) => {
        try {
            dispatch(getMyStoryStart())
            const token = await AsyncStorage .getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/stories/getmystories'

            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 200) return dispatch(getMyStorySuccess(response.stack.publicationList))
                    return dispatch(getMyStoryFail(response))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getMyStoryFail(error));
        }
    };
}

export function deleteStoryByIdActions(id) {
    return async (dispatch) => {
        try {

            dispatch(deleteStoryByIdStart())
            const token = await AsyncStorage .getItem('userToken')
            const url = `https://pre-master-wiins-backend.herokuapp.com/stories/deleteStoryById/${id}`

            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 200) return dispatch(deleteStoryByIdSuccess(id))
                    return dispatch(deleteStoryByIdFail(response))
                })
        } catch (error) {
            sendError(error)
            return dispatch(deleteStoryByIdFail(error));
        }
    };
}
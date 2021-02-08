import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { getCacheLinkOrSeverLinkForTube } from './../../app/services/cache/cache-tube-service'
import { addTubeInCache } from './../TubeMenu/actions'

export function downloadTubeProgress(progress) {
    return { type: ActionTypes.DOWNLOAD_TUBE_PROGRESS, payload: progress }
}

export function downloadTubeStart() {
    return { type: ActionTypes.DOWNLOAD_TUBE }
}

export function downloadTubeSuccess() {
    return { type: ActionTypes.DOWNLOAD_TUBE_SUCCESS }
}

export function downloadTubeFail(error) {
    return {
        type: ActionTypes.DOWNLOAD_TUBE_FAIL,
        payload: error,
    }
}

export function deleteDownloadedTubeStart() {
    return { type: ActionTypes.DELETE_DOWNLOADED_TUBE }
}

export function deleteDownloadedTubeSuccess() {
    return { type: ActionTypes.DELETE_DOWNLOADED_TUBE_SUCCESS }
}

export function deleteDownloadedTubeFail(error) {
    return {
        type: ActionTypes.DELETE_DOWNLOADED_TUBE_FAIL,
        payload: error,
    }
}

export function followInTubePageStart() {
    return { type: ActionTypes.FOLLOW_IN_TUBE_PAGE }
}

export function followInPageSuccess() {
    return { type: ActionTypes.FOLLOW_IN_TUBE_PAGE_SUCCESS }
}

export function followInPageFail(error) {
    return {
        type: ActionTypes.FOLLOW_IN_TUBE_PAGE_FAIL,
        payload: error,
    }
}

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

export function dislikeTubePageSuccess() {
    return { type: ActionTypes.DISLIKE_TUBE_PAGE_SUCCESS }
}

export function dislikeTubePageStart() {
    return { type: ActionTypes.DISLIKE_TUBE_PAGE }
}

export function dislikeTubePageFail(error) {
    return {
        type: ActionTypes.DISLIKE_TUBE_PAGE_FAIL,
        payload: error,
    }
}

export async function getTubePageSuccess(payload) {

    const foundInCache = await getCacheLinkOrSeverLinkForTube(payload.tube.videoLink)

    if(foundInCache){ payload.tube.inCache = true }
    else { payload.tube.inCache = false }

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
                .then(async (response) => {
                    if (response.status == 201) return dispatch(await getTubePageSuccess(response.page))
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

            return fetch(`https://wiins-backend.herokuapp.com/tube/like/${id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(likeTubePageSuccess())
                    return dispatch(likeTubePageFail())
                })
        } catch (error) {
            return dispatch(likeTubePageFail(error));
        }
    }
}

export function dislikeTubePageActions(id) {

    return async (dispatch) => {
        try {
            dispatch(dislikeTubePageStart())
            const token = await AsyncStorage.getItem('userToken')

            return fetch(`https://wiins-backend.herokuapp.com/tube/dislike/${id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(dislikeTubePageSuccess())
                    return dispatch(dislikeTubePageFail())
                })
        } catch (error) {
            return dispatch(dislikeTubePageFail(error));
        }
    }
}

export function followInTubePageActions(profileId) {

    return async (dispatch) => {
        try {
            dispatch(followInTubePageStart())
            const token = await AsyncStorage.getItem('userToken')

            return fetch('https://wiins-backend.herokuapp.com/profile/follow/' + profileId, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(followInTubePageSuccess())
                    return dispatch(followInTubePageFail())
                })
        } catch (error) {
            return dispatch(followInTubePageFail(error));
        }
    }
}

export function downloadTubeStartActions() {
    return (dispatch) => {
        dispatch(downloadTubeStart())
    }
}

export function downloadTubeProgressActions(progress) {
    return (dispatch) => dispatch(downloadTubeProgress(progress))
}

export function addTubeInCacheSuccessActions(tube) {
    return (dispatch) => {
        dispatch(downloadTubeSuccess())
        dispatch(addTubeInCache(tube))
    }
}

export function addTubeInCacheFailedActions() {
    return (dispatch) => { dispatch(downloadTubeFail()) }
}
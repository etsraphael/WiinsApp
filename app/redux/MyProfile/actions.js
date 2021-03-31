import { GET_MY_PROFILE, GET_MY_PROFILE_SUCCESS, GET_MY_PROFILE_FAIL } from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { sendError } from './../../../app/services/error/error-service'

export function getMyProfileSuccess(profile) {
    return {
        type: GET_MY_PROFILE_SUCCESS,
        payload: profile,
    }
}

export function getMyProfileStart() {
    return { type: GET_MY_PROFILE }
}

export function getMyProfileFail(error) {
    return {
        type: GET_MY_PROFILE_FAIL,
        payload: error,
    }
}

export function getMyProfile() {
    return async (dispatch) => {
        try {
            dispatch(getMyProfileStart())
            const token = await AsyncStorage .getItem('userToken')
            return fetch('https://wiins-backend.herokuapp.com/myprofile', {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 200) {
                        return dispatch(getMyProfileSuccess(response.profile))
                    }
                    return dispatch(getMyProfileFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(getMyProfileFail(error));
        }
    };
}
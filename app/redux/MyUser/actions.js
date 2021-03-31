import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage';
import { sendError } from './../../../app/services/error/error-service'
import { sendTokenDevice } from './../../services/notification/token-service'

export function loginSuccess(user) {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        payload: user
    }
}

export function loginStart() {
    return { type: ActionTypes.LOGIN }
}

export function loginFail(error) {
    return {
        type: ActionTypes.LOGIN_FAIL,
        payload: error,
    }
}

export function registerSuccess(message) {
    return {
        type: ActionTypes.REGISTER_SUCCESS,
        message
    }
}

export function registerStart() {
    return { type: ActionTypes.REGISTER }
}

export function registerFail(error) {
    return {
        type: ActionTypes.REGISTER_FAIL,
        payload: error,
    }
}

export function logOutAction() {
    return { type: ActionTypes.LOGOUT }
}

export function login(email, password) {
    return async (dispatch) => {
        try {
            dispatch(loginStart())
            return fetch('https://wiins-backend.herokuapp.com/auth/signin', {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 200) {
                        await AsyncStorage.setItem('userToken', response.token)
                        await sendTokenDevice()
                        return dispatch(loginSuccess(response.user))
                    }
                    return dispatch(loginFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(loginFail(error))
        }
    }
}

export function register(user, userDetail) {
    return async (dispatch) => {
        try {
            dispatch(registerStart())
            return fetch('https://wiins-backend.herokuapp.com/auth/signup/validation-pseudo', {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({user, userDetail})
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 201) return dispatch(registerSuccess('success'))
                    else return dispatch(registerSuccess(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(loginFail(error))
        }
    }
}

export function logOut() {
    return (dispatch) => dispatch(logOutAction())
}
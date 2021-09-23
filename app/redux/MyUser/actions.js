import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage';
import { sendError } from './../../../app/services/error/error-service'
import { sendTokenDevice } from './../../services/notification/token-service'
import Snackbar from 'react-native-snackbar'
import I18n from '../../../assets/i18n/i18n';

export function resetUserConnected() {
    return { type: ActionTypes.RESET_USER_CONNECTED }
}

export function forgotPasswordSendSuccess(message) {
    return { type: ActionTypes.FORGOT_PASSWORD_SEND_SUCCESS, message }
}

export function forgotPasswordSendStart() {
    return { type: ActionTypes.FORGOT_PASSWORD_SEND }
}

export function forgotPasswordSendFail() {
    Snackbar.show({ text: I18n.t('ERROR-MESSAGE.Email-invalid'), duration: Snackbar.LENGTH_LONG })
    return { type: ActionTypes.FORGOT_PASSWORD_SEND_FAIL }
}

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

export function setUpLanguage(payload) {
    return { type: ActionTypes.SET_UP_LANGUAGE_CONFIG, payload }
}

export function setUpLanguageActions(lgCode) {
    return (dispatch) => dispatch(setUpLanguage(lgCode))
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
                .then(async (response) => {
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
                body: JSON.stringify({ user, userDetail })
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

export function forgotPasswordSend(email) {
    return async (dispatch) => {
        try {
            dispatch(forgotPasswordSendStart())

            return fetch('https://wiins-backend.herokuapp.com/auth/passwordForgot', {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
                .then((response) => response.json())
                .then(response => {
                    if (response.status == 200) {
                        return dispatch(forgotPasswordSendSuccess('email-sent'))
                    }
                    else return dispatch(forgotPasswordSendFail(response.message))
                })
        } catch (error) {
            sendError(error)
            return dispatch(forgotPasswordSendFail())
        }
    }
}

export function logOut() {
    return (dispatch) => dispatch(logOutAction())
}
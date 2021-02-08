import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'

export function addTubeInCache(tube) {
    return { type: ActionTypes.ADD_TUBE_IN_CACHE, payload: tube }
}

export function getTubeMenuSuccess(menu) {
    return {
        type: ActionTypes.GET_TUBE_MENU_SUCCESS,
        payload: menu
    }
}

export function getTubeMenuStart() {
    return { type: ActionTypes.GET_TUBE_MENU }
}

export function getTubeMenuFail(error) {
    return {
        type: ActionTypes.GET_TUBE_MENU_FAIL,
        payload: error,
    }
}

export function resetTubeMenu() {
    return { type: ActionTypes.RESET_TUBE_MENU }
}

export function getTubeMenuActions() {

    return async (dispatch) => {
        try {
            dispatch(resetTubeMenu())
            dispatch(getTubeMenuStart())
            const url = 'https://wiins-backend.herokuapp.com/tube/menu/app'
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 201) return dispatch(getTubeMenuSuccess(response.menu))
                    return dispatch(getTubeMenuFail(response.message))
                })
        } catch (error) {
            return dispatch(getTubeMenuFail(error));
        }
    };
}
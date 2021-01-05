import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'

export function getMusicMenuSuccess(menu) {
    return { 
        type: ActionTypes.GET_MUSIC_MENU_SUCCESS,
        payload: menu
    }
}

export function getMusicMenuStart() {
    return { type: ActionTypes.GET_MUSIC_MENU }
}

export function getMusicMenuFail(error) {
    return {
        type: ActionTypes.GET_MUSIC_MENU_FAIL,
        payload: error,
    }
}

export function getMusicMenu() {
    return async (dispatch) => {
        try {
            dispatch(getMusicMenuStart())
            const url = 'https://wiins-backend.herokuapp.com/music/menu/app/playlist'
            const token = await AsyncStorage.getItem('userToken')

            return fetch(url, {
                method: 'GET',
                headers: { 
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
                .then((response) => response.json())
                .then( async (response) => {
                    if (response.status == 200) return dispatch(getMusicMenuSuccess(response.menu))
                    return dispatch(getMusicMenuFail(response.message))
                })
        } catch (error) {
            return dispatch(getMusicMenuFail(error));
        }
    };
}
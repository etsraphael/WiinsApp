import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { verificationMusicCacheFormat } from './../../../app/services/cache/cache-music-service'
import { sendError } from './../../../app/services/error/error-service'

export function getMusicMenuSuccess(menu, rapList) {

    console.log('function called')
    return { 
        type: ActionTypes.GET_MUSIC_MENU_SUCCESS,
        rap: rapList,
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
                .then(async (response) => {
                    if (response.status == 200) {
                        const defaultPlaylist = await verificationMusicCacheFormat(response.menu.stylesSuggestion.rap)
                        return dispatch(getMusicMenuSuccess(response.menu, defaultPlaylist))
                    } else {
                        return dispatch(getMusicMenuFail(response.message))
                    }
                })
        } catch (error) {
            sendError(error)
            return dispatch(getMusicMenuFail(error));
        }
    };
}
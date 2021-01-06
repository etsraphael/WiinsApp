import * as ActionTypes from './constants'
import AsyncStorage from '@react-native-community/async-storage'
import { verificationMusicCacheFormat } from './../../app/services/cache/cache-music-service'

export async function getMyFavMusicSuccess(payload) {
    return { type: ActionTypes.GET_MY_FAV_MUSIC_SUCCESS, payload: await verificationMusicCacheFormat(payload) }
}

export function getMyFavMusicStart() {
    return { type: ActionTypes.GET_MY_FAV_MUSIC }
}

export function setMusicInTheCache(url) {
    return { type: ActionTypes.SET_MUSIC_FAV_IN_CACHE, url }
}

export function getMyFavMusicFail(error) {
    return { type: ActionTypes.GET_MY_FAV_MUSIC_FAIL, payload: error }
}

export function getMyMusic() {
    return async (dispatch) => {
        try {
            dispatch(getMyFavMusicStart())
            const token = await AsyncStorage.getItem('userToken')
            const url = 'https://wiins-backend.herokuapp.com/music/myfavorite/'

            return fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', 'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((response) => response.json())
                .then(async (response) => {
                    if (response.status == 200) return dispatch(await getMyFavMusicSuccess(response.playlist))
                    return dispatch(getMyFavMusicFail(response.message))
                })
        } catch (error) {
            return dispatch(getMyFavMusicFail(error));
        }
    };
}

export function setMusicInTheCacheActions(url){
    return (dispatch) => {
        
        dispatch(setMusicInTheCache(url))
    }
}

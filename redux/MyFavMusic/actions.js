import * as ActionTypes from './constants';
import AsyncStorage from '@react-native-community/async-storage';

export function getMyFavMusicSuccess(musics) {
    return { type: ActionTypes.GET_MY_FAV_MUSIC_SUCCESS, payload: musics }
}

export function getMyFavMusicStart() {
    return { type: ActionTypes.GET_MY_FAV_MUSIC }
}

export function getMyFavMusicFail(error) {
    return { type: ActionTypes.GET_MY_FAV_MUSIC_FAIL, payload: error }
}

export function requestFileCache(key) {
    return { type: ActionTypes.FILE_CACHE_REQUESTED, key }
}

export function beginFileCache(key) {
    return { type: ActionTypes.FILE_CACHE_IN_PROGRESS, key }
}

export function completeFileCache(key, localUrl) {
    return { type: ActionTypes.FILE_CACHE_SUCCEEDED, key, localUrl }
}

export function failFileCache(key) {
    return { type: ActionTypes.FILE_CACHE_FAILED, key }
}

export function removeFileCache(key) {
    return { type: ActionTypes.REMOVE_FILE_IN_CACHE, key }
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
                    if (response.status == 201) return dispatch(getMyFavMusicSuccess(response.playlist))
                    return dispatch(getMyFavMusicFail(response.message))
                })
        } catch (error) {
            return dispatch(getMyFavMusicFail(error));
        }
    };
}

export function beginFileCacheActions(url) {
    return async (dispatch) => {
        try {
            return dispatch(beginFileCache(url));
        } catch (error) {
            return dispatch(failFileCache(url));
        }
    };
}

export function completeFileCacheActions(originalUrl, localUrl){
    return async (dispatch) => {
        try {
            return dispatch(completeFileCache(originalUrl, localUrl));
        } catch (error) {
            return dispatch(failFileCache(url));
        }
    };
}

export function failFileCacheActions(url){
    return (dispatch) => { return dispatch(failFileCache(url)) }
}

export function removeFileCacheActions(url){
    return (dispatch) => {
        try {
            return dispatch(removeFileCache(url))
        } catch (error) {
            return dispatch(failFileCache(url))
        }
    };
}